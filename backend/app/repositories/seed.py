# Seed data for the repository tables (T-32).
#
#   flask --app run seed-repositories            # adds the rows if the project has none yet
#   flask --app run seed-repositories --reset    # removes the project's repository rows first
#
# Rows come from seed_data.json – the same items as the frontend mock data
# (frontend/src/mocks/repositories.js), which match the Project Repositories mockup:
# 24 evidence items, 18 artifacts, 14 certified items with their source evidence links.
# Seed rows have no real file behind them (storage_path is null).

import json
from datetime import date, datetime
from pathlib import Path

import click

from extensions import db
from app.repositories.models import (
    Artifact,
    ArtifactFolder,
    ArtifactVersion,
    CertifiedItem,
    CertifiedItemSource,
    Evidence,
)

SEED_FILE = Path(__file__).with_name("seed_data.json")

# The demo project the frontend shows ("Eligibility Modernization").
DEFAULT_PROJECT_ID = 1


def _day(value):
    return date.fromisoformat(value)


def _midday(value):
    # A plain date from the mock → a UTC timestamp on that day.
    return datetime.combine(_day(value), datetime.min.time()).replace(hour=12)


def clear_repositories(project_id):
    """Delete every repository row of one project (children first)."""
    certified_ids = db.session.query(CertifiedItem.id).filter_by(project_id=project_id)
    CertifiedItemSource.query.filter(CertifiedItemSource.certified_item_id.in_(certified_ids)).delete(
        synchronize_session=False
    )
    CertifiedItem.query.filter_by(project_id=project_id).delete(synchronize_session=False)

    artifact_ids = db.session.query(Artifact.id).filter_by(project_id=project_id)
    ArtifactVersion.query.filter(ArtifactVersion.artifact_id.in_(artifact_ids)).delete(synchronize_session=False)
    Artifact.query.filter_by(project_id=project_id).delete(synchronize_session=False)
    ArtifactFolder.query.filter_by(project_id=project_id).delete(synchronize_session=False)

    Evidence.query.filter_by(project_id=project_id).delete(synchronize_session=False)


def seed_repositories(project_id=DEFAULT_PROJECT_ID):
    """Insert the seed rows for one project. Returns the counts added."""
    data = json.loads(SEED_FILE.read_text(encoding="utf-8"))

    # 1. Evidence
    evidence_by_key = {}
    for row in data["evidence"]:
        added = _midday(row["date_added"])
        item = Evidence(
            project_id=project_id,
            name=row["name"],
            type=row["type"],
            source=row["source"],
            classification=row["classification"],
            version=row["version"],
            status=row["status"],
            capability=row["capability"],
            date_added=_day(row["date_added"]),
            created_at=added,
            updated_at=added,
        )
        db.session.add(item)
        evidence_by_key[row["key"]] = item

    # 2. Artifacts, each with its current version
    for row in data["artifacts"]:
        updated = _midday(row["last_updated"])
        artifact = Artifact(
            project_id=project_id,
            name=row["name"],
            file_type=row["file_type"],
            capability=row["capability"],
            status=row["status"],
            owner=row["owner"],
            created_at=updated,
            updated_at=updated,
        )
        artifact.versions.append(ArtifactVersion(version=row["version"], created_at=updated))
        db.session.add(artifact)

    # 3. Certified items + traceability to their source evidence
    for row in data["certified_items"]:
        certified = _midday(row["certified_date"])
        item = CertifiedItem(
            project_id=project_id,
            name=row["name"],
            file_type=row["file_type"],
            capability=row["capability"],
            type=row["type"],
            version=row["version"],
            certified_date=_day(row["certified_date"]),
            approver=row["approver"],
            created_at=certified,
            updated_at=certified,
        )
        for key in row["source_evidence"]:
            item.sources.append(CertifiedItemSource(evidence=evidence_by_key[key]))
        db.session.add(item)

    db.session.commit()
    return {
        "evidence": len(data["evidence"]),
        "artifacts": len(data["artifacts"]),
        "certified_items": len(data["certified_items"]),
    }


@click.command("seed-repositories")
@click.option("--project-id", default=DEFAULT_PROJECT_ID, show_default=True, help="Project to seed.")
@click.option("--reset", is_flag=True, help="Delete the project's repository rows before seeding.")
def seed_repositories_command(project_id, reset):
    """Load the repository seed data (evidence, artifacts, certified items)."""
    if reset:
        clear_repositories(project_id)
        db.session.commit()
        click.echo(f"Removed existing repository rows for project {project_id}.")
    elif Evidence.query.filter_by(project_id=project_id).first():
        click.echo(f"Project {project_id} already has repository data - nothing added. Use --reset to reload.")
        return

    counts = seed_repositories(project_id)
    click.echo(
        f"Seeded project {project_id}: {counts['evidence']} evidence, "
        f"{counts['artifacts']} artifacts, {counts['certified_items']} certified items."
    )
