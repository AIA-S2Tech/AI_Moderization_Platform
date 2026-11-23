# Allowed values for repository inputs (T-33).
#
# Kept in step with the frontend config so the API accepts exactly what the
# Upload Evidence pop-up offers:
#   EVIDENCE_TYPES / SOURCES / CLASSIFICATIONS  ← frontend/src/config/evidence.js (EVIDENCE_OPTIONS)
#   CAPABILITIES                                ← frontend/src/config/routes.js (WORKSPACE_ROUTES keys)
# File type / size limits live in config.py (EVIDENCE_ALLOWED_EXTENSIONS, EVIDENCE_MAX_FILE_MB),
# matching frontend/src/config/upload.js.

EVIDENCE_TYPES = (
    "Source Code",
    "Document",
    "Architecture",
    "Requirements",
    "Data Model",
    "Procedure",
    "Interface",
    "Test",
    "Policy",
    "Meeting Notes",
)

EVIDENCE_SOURCES = ("Client", "S2Tech", "Third Party")

EVIDENCE_CLASSIFICATIONS = ("Confidential", "Internal", "Public")

CAPABILITIES = (
    "legacyDiscovery",
    "businessRuleIntelligence",
    "modernizationAssessment",
    "targetedModernization",
    "aiCodeTransformation",
)

# New uploads start here; SME validation moves them on (T-33 does not change status).
NEW_EVIDENCE_STATUS = "In Review"
