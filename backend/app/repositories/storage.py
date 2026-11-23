# File storage for uploaded evidence (T-33).
#
# Root folder: EVIDENCE_STORAGE_PATH (env / config.py, default backend/uploads/evidence).
# Each file is saved as  <root>/project_<id>/<random>_<safe file name>  and the
# database keeps the path relative to the root, so the root can move between machines.
# Files are only ever written once; nothing here modifies or removes a stored original
# (delete_stored_file is used only to clean up when saving the database row fails).

import os
import posixpath
import uuid
from pathlib import Path

from flask import current_app
from werkzeug.utils import secure_filename

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent


def storage_root():
    root = Path(current_app.config["EVIDENCE_STORAGE_PATH"])
    if not root.is_absolute():
        root = BACKEND_DIR / root
    return root.resolve()


def original_name(filename):
    """The user's file name without any folder part ("C:\\docs\\a.pdf" → "a.pdf")."""
    return posixpath.basename((filename or "").replace("\\", "/")).strip()


def file_extension(filename):
    name = original_name(filename)
    return name.rsplit(".", 1)[1].lower() if "." in name else ""


def file_size(file_storage):
    stream = file_storage.stream
    stream.seek(0, os.SEEK_END)
    size = stream.tell()
    stream.seek(0)
    return size


def save_evidence_file(file_storage, project_id):
    """Write the upload to disk. Returns the path relative to the storage root."""
    safe = secure_filename(original_name(file_storage.filename)) or "file"
    relative = Path(f"project_{project_id}") / f"{uuid.uuid4().hex}_{safe}"
    target = storage_root() / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    file_storage.save(target)
    return relative.as_posix()


def resolve_stored_file(relative_path):
    """Absolute path of a stored file, or None if it is missing / outside the root."""
    if not relative_path:
        return None
    root = storage_root()
    path = (root / relative_path).resolve()
    if root not in path.parents or not path.is_file():
        return None
    return path


def delete_stored_file(relative_path):
    path = resolve_stored_file(relative_path)
    if path:
        path.unlink(missing_ok=True)
