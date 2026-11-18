// Dropdown options of the Upload Evidence pop-up. UploadEvidenceModal reads them,
// so adding a type, source or classification is a config change only.
export const EVIDENCE_OPTIONS = {
  types: [
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
  ],
  sources: ["Client", "S2Tech", "Third Party"],
  classifications: ["Confidential", "Internal", "Public"],
};
