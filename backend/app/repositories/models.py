# Repository tables (T-32): Evidence, Working / Generated Artifact and Certified
# Knowledge repositories.
#
#   evidence                 – source material uploaded per project (soft delete only)
#   artifact_folders         – folders in the Artifact Repository ("+ New Folder")
#   artifacts                – working / generated artifacts and their lifecycle status
#   artifact_versions        – every version of an artifact (v0.1, v0.2, …)
#   certified_items          – validated knowledge promoted from an artifact
#   certified_item_sources   – traceability: which evidence a certified item is based on
#
# project_id: every row belongs to a project (the APIs are /api/projects/:projectId/…).
#   There is no projects table yet (no task creates one), so it is a plain indexed
#   column for now; add the foreign key when the projects table lands.
# capability: workspace key used by the frontend (config/routes.js WORKSPACE_ROUTES),
#   e.g. "legacyDiscovery", "businessRuleIntelligence".
# Timestamps are UTC (datetime.utcnow), like the users tables; plain dates (date_added,
# certified_date) are calendar dates.

from datetime import date, datetime

from extensions import db

# Artifact lifecycle (T-34 PATCH /artifacts/:id/status). Draft = practitioner work
# that has not been generated / submitted yet.
ARTIFACT_STATUSES = ("Draft", "Generated", "In Review", "Revised", "Ready for Certification")

# Evidence statuses shown in the Evidence Repository.
EVIDENCE_STATUSES = ("In Review", "Pending SME", "Validated")


def _in_list(column, values):
    quoted = ", ".join(f"'{v}'" for v in values)
    return f"{column} IN ({quoted})"


class Evidence(db.Model):
    __tablename__ = "evidence"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    project_id = db.Column(db.BigInteger, nullable=False, index=True)

    name = db.Column(db.String(255), nullable=False)               # original file name
    type = db.Column(db.String(50), nullable=False)                # Source Code, Document, Policy…
    source = db.Column(db.String(50), nullable=False)              # Client, S2Tech, Third Party
    classification = db.Column(db.String(30), nullable=False)      # Public, Internal, Confidential
    version = db.Column(db.String(20), nullable=False, default="v1.0")
    status = db.Column(db.String(30), nullable=False, default="In Review")
    capability = db.Column(db.String(50), nullable=True, index=True)

    # Stored file (T-33). Null for seed rows, which have no real file behind them.
    storage_path = db.Column(db.Text, nullable=True)
    file_size = db.Column(db.BigInteger, nullable=True)            # bytes
    mime_type = db.Column(db.String(100), nullable=True)

    date_added = db.Column(db.Date, nullable=False, default=date.today, index=True)
    uploaded_by = db.Column(db.BigInteger, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    # Soft delete: the row and the original file are never removed or modified.
    is_deleted = db.Column(db.Boolean, nullable=False, default=False, server_default=db.false(), index=True)
    deleted_at = db.Column(db.DateTime, nullable=True)
    deleted_by = db.Column(db.BigInteger, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        db.CheckConstraint(_in_list("status", EVIDENCE_STATUSES), name="ck_evidence_status"),
    )


class ArtifactFolder(db.Model):
    __tablename__ = "artifact_folders"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    project_id = db.Column(db.BigInteger, nullable=False, index=True)
    name = db.Column(db.String(255), nullable=False)
    capability = db.Column(db.String(50), nullable=True)

    created_by = db.Column(db.BigInteger, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    artifacts = db.relationship("Artifact", back_populates="folder")

    __table_args__ = (
        # "A folder with this name already exists" (New Folder modal).
        db.UniqueConstraint("project_id", "name", name="uq_artifact_folders_project_name"),
    )


class Artifact(db.Model):
    __tablename__ = "artifacts"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    project_id = db.Column(db.BigInteger, nullable=False, index=True)
    folder_id = db.Column(
        db.BigInteger, db.ForeignKey("artifact_folders.id", ondelete="SET NULL"), nullable=True, index=True
    )

    name = db.Column(db.String(255), nullable=False)
    file_type = db.Column(db.String(20), nullable=True)            # docx, pdf, xlsx…
    capability = db.Column(db.String(50), nullable=True, index=True)
    status = db.Column(db.String(40), nullable=False, default="Generated", index=True)
    owner = db.Column(db.String(150), nullable=True)               # display name, e.g. "John Doe"

    created_by = db.Column(db.BigInteger, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    folder = db.relationship("ArtifactFolder", back_populates="artifacts")
    versions = db.relationship(
        "ArtifactVersion",
        back_populates="artifact",
        cascade="all, delete-orphan",
        order_by="ArtifactVersion.created_at",
    )

    __table_args__ = (
        db.CheckConstraint(_in_list("status", ARTIFACT_STATUSES), name="ck_artifacts_status"),
    )

    @property
    def current_version(self):
        """Latest version label, e.g. "v0.2" (None when there are no versions)."""
        return self.versions[-1].version if self.versions else None


class ArtifactVersion(db.Model):
    __tablename__ = "artifact_versions"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    artifact_id = db.Column(
        db.BigInteger, db.ForeignKey("artifacts.id", ondelete="CASCADE"), nullable=False, index=True
    )
    version = db.Column(db.String(20), nullable=False)             # "v0.1"
    storage_path = db.Column(db.Text, nullable=True)
    notes = db.Column(db.Text, nullable=True)

    created_by = db.Column(db.BigInteger, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    artifact = db.relationship("Artifact", back_populates="versions")

    __table_args__ = (
        db.UniqueConstraint("artifact_id", "version", name="uq_artifact_versions_artifact_version"),
    )


class CertifiedItem(db.Model):
    __tablename__ = "certified_items"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    project_id = db.Column(db.BigInteger, nullable=False, index=True)
    # The artifact it was promoted from (kept null if that artifact is ever removed).
    artifact_id = db.Column(
        db.BigInteger, db.ForeignKey("artifacts.id", ondelete="SET NULL"), nullable=True, index=True
    )

    name = db.Column(db.String(255), nullable=False)
    file_type = db.Column(db.String(20), nullable=True)
    capability = db.Column(db.String(50), nullable=True, index=True)
    type = db.Column(db.String(50), nullable=False)                # Report, Inventory, Catalog…
    version = db.Column(db.String(20), nullable=False)
    certified_date = db.Column(db.Date, nullable=False, index=True)
    approver = db.Column(db.String(150), nullable=False)           # display name, e.g. "Linda Park"

    certified_by = db.Column(db.BigInteger, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    sources = db.relationship(
        "CertifiedItemSource", back_populates="certified_item", cascade="all, delete-orphan"
    )


class CertifiedItemSource(db.Model):
    """Traceability link: certified item ← source evidence."""

    __tablename__ = "certified_item_sources"

    certified_item_id = db.Column(
        db.BigInteger, db.ForeignKey("certified_items.id", ondelete="CASCADE"), primary_key=True
    )
    evidence_id = db.Column(
        db.BigInteger, db.ForeignKey("evidence.id", ondelete="RESTRICT"), primary_key=True, index=True
    )

    certified_item = db.relationship("CertifiedItem", back_populates="sources")
    evidence = db.relationship("Evidence")
