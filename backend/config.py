
import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta
from sqlalchemy.engine import URL

# backend/app/config.py
BASE_DIR = Path(__file__).resolve().parent.parent

ENV_PATH = BASE_DIR / ".env"

# Explicitly load backend/.env
load_dotenv(ENV_PATH, override=True)


class Config:

    SQLALCHEMY_DATABASE_URI = URL.create(
        drivername="postgresql+psycopg2",
        username=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "5432")),
        database=os.getenv("DB_NAME")
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)

    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    JSON_SORT_KEYS = False
    PROPAGATE_EXCEPTIONS = True

    # Evidence uploads (T-33). Limits match frontend/src/config/upload.js.
    # EVIDENCE_STORAGE_PATH may be absolute or relative to backend/.
    EVIDENCE_STORAGE_PATH = os.getenv("EVIDENCE_STORAGE_PATH", "uploads/evidence")
    EVIDENCE_MAX_FILE_MB = int(os.getenv("EVIDENCE_MAX_FILE_MB", "50"))
    EVIDENCE_ALLOWED_EXTENSIONS = {"zip", "pdf", "docx", "xlsx", "vsdx"}
    # Whole-request cap (file + form fields); the per-file check is in evidence_routes.py.
    MAX_CONTENT_LENGTH = (EVIDENCE_MAX_FILE_MB + 1) * 1024 * 1024


ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'}


def allowed_file(filename, file_type):
    ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''

    if file_type == 'resume':
        return ext in {'pdf', 'doc', 'docx'}

    if file_type == 'profile':
        return ext in {'png', 'jpg', 'jpeg'}

    if file_type == 'documents':
        return ext in {'pdf', 'doc', 'docx'}

    return False
