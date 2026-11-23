# Evidence APIs (T-33). All routes need a valid access token (Authorization: Bearer …).
#
#   GET    /api/projects/:projectId/evidence                 list (search, filters, date range, paging, sort)
#   POST   /api/projects/:projectId/evidence                 upload one file + metadata (multipart/form-data)
#   GET    /api/projects/:projectId/evidence/:id/download    download the stored original
#   DELETE /api/projects/:projectId/evidence/:id             soft delete – row and file are kept unchanged
#
# Soft-deleted evidence is hidden from the list and cannot be downloaded or deleted again.

import logging
from datetime import date, datetime

from flask import Blueprint, current_app, jsonify, request, send_file
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError
from sqlalchemy import or_
from werkzeug.exceptions import RequestEntityTooLarge

from extensions import db
from app.repositories.constants import NEW_EVIDENCE_STATUS
from app.repositories.models import Evidence
from app.repositories.schemas import EvidenceSchema, EvidenceUploadSchema
from app.repositories.storage import (
    delete_stored_file,
    file_extension,
    file_size,
    original_name,
    resolve_stored_file,
    save_evidence_file,
)

evidence_bp = Blueprint("evidence", __name__)

evidence_schema = EvidenceSchema()
evidence_list_schema = EvidenceSchema(many=True)
upload_schema = EvidenceUploadSchema()

DEFAULT_PAGE_SIZE = 10      # rows per page in the mockup
MAX_PAGE_SIZE = 100

# ?sort= value → column. Keys match the frontend column keys (config/repositories.js).
SORT_COLUMNS = {
    "name": Evidence.name,
    "type": Evidence.type,
    "source": Evidence.source,
    "dateAdded": Evidence.date_added,
    "status": Evidence.status,
    "classification": Evidence.classification,
    "version": Evidence.version,
    "capability": Evidence.capability,
}
DEFAULT_SORT = "dateAdded"


def _error(message, status, details=None):
    body = {"error": message}
    if details:
        body["details"] = details
    return jsonify(body), status


def _current_user_id():
    return int(get_jwt_identity())


def _positive_int(name, default, maximum=None):
    raw = request.args.get(name)
    if raw in (None, ""):
        return default
    try:
        value = int(raw)
    except ValueError:
        raise ValidationError({name: ["Must be a whole number."]})
    if value < 1 or (maximum and value > maximum):
        limit = f" between 1 and {maximum}" if maximum else " of 1 or more"
        raise ValidationError({name: [f"Must be a number{limit}."]})
    return value


def _iso_date(name):
    raw = request.args.get(name)
    if raw in (None, ""):
        return None
    try:
        return date.fromisoformat(raw)
    except ValueError:
        raise ValidationError({name: ["Must be a date as YYYY-MM-DD."]})


def _active_evidence(project_id, evidence_id):
    return Evidence.query.filter_by(id=evidence_id, project_id=project_id, is_deleted=False).first()


@evidence_bp.errorhandler(RequestEntityTooLarge)
def _too_large(_err):
    return _error(f"File is larger than {current_app.config['EVIDENCE_MAX_FILE_MB']} MB.", 413)


# ── List ────────────────────────────────────────────────────────────────
@evidence_bp.route("", methods=["GET"])
@jwt_required()
def list_evidence(project_id):
    """
    Query parameters (all optional):
      search      text in name, type or source (case-insensitive)
      type        exact evidence type, e.g. "Source Code"
      source      exact source, e.g. "Client"
      capability  workspace key, e.g. "legacyDiscovery" (workspace Evidence tab)
      status      exact status, e.g. "Validated"
      dateFrom    YYYY-MM-DD, inclusive (Date Added)
      dateTo      YYYY-MM-DD, inclusive
      page        1-based, default 1
      pageSize    default 10, max 100
      sort        name | type | source | dateAdded | status | classification | version | capability
                  (default dateAdded)
      direction   asc | desc (default desc for dateAdded, asc otherwise)
    """
    try:
        page = _positive_int("page", 1)
        page_size = _positive_int("pageSize", DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)
        date_from = _iso_date("dateFrom")
        date_to = _iso_date("dateTo")
        if date_from and date_to and date_from > date_to:
            raise ValidationError({"dateFrom": ["Must be on or before dateTo."]})

        sort = request.args.get("sort") or DEFAULT_SORT
        if sort not in SORT_COLUMNS:
            raise ValidationError({"sort": [f"Must be one of: {', '.join(SORT_COLUMNS)}."]})
        direction = (request.args.get("direction") or ("desc" if sort == "dateAdded" else "asc")).lower()
        if direction not in ("asc", "desc"):
            raise ValidationError({"direction": ["Must be asc or desc."]})
    except ValidationError as err:
        return _error("Invalid query parameters", 400, err.messages)

    query = Evidence.query.filter_by(project_id=project_id, is_deleted=False)

    search = (request.args.get("search") or "").strip()
    if search:
        # autoescape: "%" and "_" typed by the user are matched literally, not as wildcards.
        query = query.filter(
            or_(*(col.icontains(search, autoescape=True) for col in (Evidence.name, Evidence.type, Evidence.source)))
        )
    for param, column in (
        ("type", Evidence.type),
        ("source", Evidence.source),
        ("capability", Evidence.capability),
        ("status", Evidence.status),
    ):
        value = request.args.get(param)
        if value:
            query = query.filter(column == value)
    if date_from:
        query = query.filter(Evidence.date_added >= date_from)
    if date_to:
        query = query.filter(Evidence.date_added <= date_to)

    column = SORT_COLUMNS[sort]
    order = column.desc() if direction == "desc" else column.asc()
    # Tie-break on id so paging is stable when many rows share a value.
    tie = Evidence.id.desc() if direction == "desc" else Evidence.id.asc()

    total = query.count()
    items = query.order_by(order, tie).offset((page - 1) * page_size).limit(page_size).all()

    return jsonify({
        "data": evidence_list_schema.dump(items),
        "pagination": {
            "page": page,
            "pageSize": page_size,
            "total": total,
            "totalPages": (total + page_size - 1) // page_size,
        },
    }), 200


# ── Upload ──────────────────────────────────────────────────────────────
@evidence_bp.route("", methods=["POST"])
@jwt_required()
def upload_evidence(project_id):
    """
    multipart/form-data:
      file            the evidence file (one per request)
      type, source, classification, version, capability   metadata (see constants.py)
    New evidence starts with status "In Review" and today's date.
    """
    upload = request.files.get("file")
    try:
        metadata = upload_schema.load(request.form.to_dict())
    except ValidationError as err:
        metadata, errors = None, dict(err.messages)
    else:
        errors = {}

    name = original_name(upload.filename) if upload else ""
    if not upload or not name:
        errors["file"] = ["A file is required."]
    else:
        allowed = current_app.config["EVIDENCE_ALLOWED_EXTENSIONS"]
        max_mb = current_app.config["EVIDENCE_MAX_FILE_MB"]
        size = file_size(upload)
        if len(name) > 255:
            errors["file"] = ["File name must be 255 characters or fewer."]
        elif file_extension(name) not in allowed:
            errors["file"] = [f"File type not allowed. Allowed: {', '.join(sorted(allowed))}."]
        elif size == 0:
            errors["file"] = ["File is empty."]
        elif size > max_mb * 1024 * 1024:
            errors["file"] = [f"File is larger than {max_mb} MB."]

    if errors:
        return _error("Invalid upload", 400, errors)

    user_id = _current_user_id()
    storage_path = save_evidence_file(upload, project_id)
    try:
        evidence = Evidence(
            project_id=project_id,
            name=name,
            type=metadata["type"],
            source=metadata["source"],
            classification=metadata["classification"],
            version=metadata["version"],
            capability=metadata["capability"],
            status=NEW_EVIDENCE_STATUS,
            storage_path=storage_path,
            file_size=size,
            mime_type=upload.mimetype or None,
            date_added=date.today(),
            uploaded_by=user_id,
        )
        db.session.add(evidence)
        db.session.commit()
    except Exception:
        db.session.rollback()
        delete_stored_file(storage_path)  # don't leave an orphan file behind
        logging.exception("Evidence upload failed (project %s)", project_id)
        return _error("Upload failed. Please try again.", 500)

    logging.info("Evidence %s uploaded to project %s by user %s", evidence.id, project_id, user_id)
    return jsonify(evidence_schema.dump(evidence)), 201


# ── Download ────────────────────────────────────────────────────────────
@evidence_bp.route("/<int:evidence_id>/download", methods=["GET"])
@jwt_required()
def download_evidence(project_id, evidence_id):
    evidence = _active_evidence(project_id, evidence_id)
    if not evidence:
        return _error("Evidence not found", 404)
    if not evidence.storage_path:
        return _error("No file is stored for this evidence", 404)

    path = resolve_stored_file(evidence.storage_path)
    if not path:
        logging.error("Stored file missing for evidence %s: %s", evidence.id, evidence.storage_path)
        return _error("Stored file not found", 404)

    return send_file(
        path,
        mimetype=evidence.mime_type or "application/octet-stream",
        as_attachment=True,
        download_name=evidence.name,
    )


# ── Delete (soft) ───────────────────────────────────────────────────────
@evidence_bp.route("/<int:evidence_id>", methods=["DELETE"])
@jwt_required()
def delete_evidence(project_id, evidence_id):
    evidence = _active_evidence(project_id, evidence_id)
    if not evidence:
        return _error("Evidence not found", 404)

    # Only the flags change. The row, its metadata, the stored file and any
    # certified-item traceability links stay exactly as they were.
    evidence.is_deleted = True
    evidence.deleted_at = datetime.utcnow()
    evidence.deleted_by = _current_user_id()
    db.session.commit()

    logging.info("Evidence %s soft-deleted in project %s", evidence.id, project_id)
    return jsonify({"message": "Evidence deleted", "id": evidence.id}), 200
