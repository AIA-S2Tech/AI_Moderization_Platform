# Request / response schemas for the repository APIs (T-33).
# Response keys are camelCase to match the frontend item shape
# (frontend/src/mocks/repositories.js), so T-35 can swap the mock service for the API.

from marshmallow import Schema, fields, pre_load, validate

from app.repositories.constants import (
    CAPABILITIES,
    EVIDENCE_CLASSIFICATIONS,
    EVIDENCE_SOURCES,
    EVIDENCE_TYPES,
)


class EvidenceUploadSchema(Schema):
    """Metadata sent with POST /evidence (multipart form fields, besides `file`)."""

    type = fields.String(required=True, validate=validate.OneOf(EVIDENCE_TYPES))
    source = fields.String(required=True, validate=validate.OneOf(EVIDENCE_SOURCES))
    classification = fields.String(required=True, validate=validate.OneOf(EVIDENCE_CLASSIFICATIONS))
    version = fields.String(required=True, validate=validate.Length(min=1, max=20))
    capability = fields.String(required=True, validate=validate.OneOf(CAPABILITIES))

    @pre_load
    def _strip(self, data, **_kwargs):
        # Trim spaces first, so "  " counts as missing and " v1.0 " is stored as "v1.0".
        return {k: v.strip() if isinstance(v, str) else v for k, v in data.items()}


class EvidenceSchema(Schema):
    id = fields.Integer()
    projectId = fields.Integer(attribute="project_id")
    name = fields.String()
    type = fields.String()
    source = fields.String()
    classification = fields.String()
    version = fields.String()
    status = fields.String()
    capability = fields.String()
    dateAdded = fields.Date(attribute="date_added")
    fileSize = fields.Integer(attribute="file_size")
    mimeType = fields.String(attribute="mime_type")
    # False for seed rows, which have no real file behind them (download returns 404).
    hasFile = fields.Function(lambda e: bool(e.storage_path))
    uploadedBy = fields.Integer(attribute="uploaded_by")
    createdAt = fields.DateTime(attribute="created_at")
    updatedAt = fields.DateTime(attribute="updated_at")
