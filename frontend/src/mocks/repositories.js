// Mock data for the 3 project repositories (T-12).
// Read only through services/repository.service.js – pages never import this file.
//
// The first 10 rows of each list match the Project Repositories mockup; the rest
// fill the counts shown there (24 evidence, 18 artifacts, 14 certified items).
// Dates are ISO (YYYY-MM-DD); `capability` is a workspace key from config/routes.js
// (WORKSPACE_ROUTES) so lists can be pre-filtered per workspace.

// ── 1. Evidence Repository (24) ─────────────────────────────────────────
export const evidenceItems = [
  { id: "ev-001", name: "MMIS_COBOL_Source.zip", type: "Source Code", source: "Client", dateAdded: "2024-10-14", status: "Validated", classification: "Confidential", version: "v1.0", capability: "legacyDiscovery" },
  { id: "ev-002", name: "JCL_Procedures.pdf", type: "Document", source: "Client", dateAdded: "2024-10-14", status: "Validated", classification: "Confidential", version: "v1.0", capability: "legacyDiscovery" },
  { id: "ev-003", name: "System Architecture.docx", type: "Architecture", source: "Client", dateAdded: "2024-10-12", status: "Validated", classification: "Internal", version: "v2.1", capability: "legacyDiscovery" },
  { id: "ev-004", name: "Business Requirements.docx", type: "Requirements", source: "Client", dateAdded: "2024-10-10", status: "Validated", classification: "Internal", version: "v1.3", capability: "businessRuleIntelligence" },
  { id: "ev-005", name: "Data Model ERD.vsdx", type: "Data Model", source: "Client", dateAdded: "2024-10-10", status: "Validated", classification: "Internal", version: "v1.0", capability: "legacyDiscovery" },
  { id: "ev-006", name: "Operations Manual.pdf", type: "Procedure", source: "Client", dateAdded: "2024-10-08", status: "Validated", classification: "Internal", version: "v4.0", capability: "legacyDiscovery" },
  { id: "ev-007", name: "Interface Control Doc.pdf", type: "Interface", source: "Client", dateAdded: "2024-10-08", status: "Validated", classification: "Confidential", version: "v1.2", capability: "modernizationAssessment" },
  { id: "ev-008", name: "Test Cases.xlsx", type: "Test", source: "Client", dateAdded: "2024-10-06", status: "Validated", classification: "Internal", version: "v1.0", capability: "businessRuleIntelligence" },
  { id: "ev-009", name: "Policy Guidelines.pdf", type: "Policy", source: "Client", dateAdded: "2024-10-05", status: "Validated", classification: "Public", version: "v3.0", capability: "businessRuleIntelligence" },
  { id: "ev-010", name: "Meeting Notes - SMEs.docx", type: "Meeting Notes", source: "S2Tech", dateAdded: "2024-10-04", status: "In Review", classification: "Internal", version: "v0.1", capability: "businessRuleIntelligence" },
  { id: "ev-011", name: "Batch Job Schedule.xlsx", type: "Procedure", source: "Client", dateAdded: "2024-10-03", status: "Validated", classification: "Internal", version: "v1.0", capability: "legacyDiscovery" },
  { id: "ev-012", name: "CICS_Screen_Maps.zip", type: "Source Code", source: "Client", dateAdded: "2024-10-03", status: "Validated", classification: "Confidential", version: "v1.0", capability: "legacyDiscovery" },
  { id: "ev-013", name: "Eligibility Rules Manual.pdf", type: "Policy", source: "Client", dateAdded: "2024-10-02", status: "Validated", classification: "Internal", version: "v2.0", capability: "businessRuleIntelligence" },
  { id: "ev-014", name: "DB2 Schema Export.zip", type: "Data Model", source: "Client", dateAdded: "2024-10-01", status: "In Review", classification: "Confidential", version: "v1.0", capability: "legacyDiscovery" },
  { id: "ev-015", name: "Network Topology.vsdx", type: "Architecture", source: "Client", dateAdded: "2024-09-30", status: "Validated", classification: "Confidential", version: "v1.1", capability: "modernizationAssessment" },
  { id: "ev-016", name: "Stakeholder Interview Notes.docx", type: "Meeting Notes", source: "S2Tech", dateAdded: "2024-09-27", status: "Pending SME", classification: "Internal", version: "v0.2", capability: "legacyDiscovery" },
  { id: "ev-017", name: "Claims Processing Flow.pdf", type: "Procedure", source: "Client", dateAdded: "2024-09-26", status: "Validated", classification: "Internal", version: "v1.0", capability: "businessRuleIntelligence" },
  { id: "ev-018", name: "Provider Interface Spec.docx", type: "Interface", source: "Third Party", dateAdded: "2024-09-25", status: "In Review", classification: "Confidential", version: "v2.0", capability: "modernizationAssessment" },
  { id: "ev-019", name: "Regression Test Suite.xlsx", type: "Test", source: "Client", dateAdded: "2024-09-24", status: "Validated", classification: "Internal", version: "v1.4", capability: "aiCodeTransformation" },
  { id: "ev-020", name: "Security Policy.pdf", type: "Policy", source: "Client", dateAdded: "2024-09-23", status: "Validated", classification: "Confidential", version: "v5.0", capability: "targetedModernization" },
  { id: "ev-021", name: "Copybook_Library.zip", type: "Source Code", source: "Client", dateAdded: "2024-09-20", status: "Validated", classification: "Confidential", version: "v1.0", capability: "aiCodeTransformation" },
  { id: "ev-022", name: "Change Request Log.xlsx", type: "Requirements", source: "Client", dateAdded: "2024-09-19", status: "Pending SME", classification: "Internal", version: "v1.0", capability: "businessRuleIntelligence" },
  { id: "ev-023", name: "Vendor Contract Summary.pdf", type: "Document", source: "Third Party", dateAdded: "2024-09-18", status: "In Review", classification: "Confidential", version: "v1.0", capability: "targetedModernization" },
  { id: "ev-024", name: "Kickoff Workshop Notes.docx", type: "Meeting Notes", source: "S2Tech", dateAdded: "2024-09-16", status: "Validated", classification: "Internal", version: "v1.0", capability: "legacyDiscovery" },
];

// ── 2. Working / Generated Artifact Repository (18) ────────────────────
// Lifecycle: Generated → In Review → Revised → Ready for Certification (Draft = practitioner work).
export const artifactItems = [
  { id: "ar-001", name: "System Overview", fileType: "docx", capability: "legacyDiscovery", version: "v0.1", status: "Generated", owner: "John Doe", lastUpdated: "2024-10-15" },
  { id: "ar-002", name: "Application Inventory", fileType: "docx", capability: "legacyDiscovery", version: "v0.2", status: "In Review", owner: "Priya Nair", lastUpdated: "2024-10-15" },
  { id: "ar-003", name: "Business Rules Analysis", fileType: "pdf", capability: "businessRuleIntelligence", version: "v0.1", status: "Generated", owner: "John Doe", lastUpdated: "2024-10-14" },
  { id: "ar-004", name: "Data Flow Diagrams", fileType: "pdf", capability: "legacyDiscovery", version: "v0.1", status: "In Review", owner: "Mark Chen", lastUpdated: "2024-10-14" },
  { id: "ar-005", name: "Modernization Options", fileType: "docx", capability: "modernizationAssessment", version: "v0.1", status: "Generated", owner: "Priya Nair", lastUpdated: "2024-10-13" },
  { id: "ar-006", name: "SME Validation Package", fileType: "pdf", capability: "businessRuleIntelligence", version: "v0.1", status: "In Review", owner: "Sara Lopez", lastUpdated: "2024-10-13" },
  { id: "ar-007", name: "Interface Inventory", fileType: "pdf", capability: "legacyDiscovery", version: "v0.3", status: "In Review", owner: "Mark Chen", lastUpdated: "2024-10-12" },
  { id: "ar-008", name: "Evidence Gap Analysis", fileType: "docx", capability: "modernizationAssessment", version: "v0.1", status: "Generated", owner: "John Doe", lastUpdated: "2024-10-12" },
  { id: "ar-009", name: "Test Scenario Drafts", fileType: "pdf", capability: "businessRuleIntelligence", version: "v0.1", status: "Draft", owner: "Sara Lopez", lastUpdated: "2024-10-11" },
  { id: "ar-010", name: "Decision Tables", fileType: "docx", capability: "businessRuleIntelligence", version: "v0.1", status: "Draft", owner: "Priya Nair", lastUpdated: "2024-10-11" },
  { id: "ar-011", name: "Batch Job Dependency Map", fileType: "pdf", capability: "legacyDiscovery", version: "v0.2", status: "Revised", owner: "Mark Chen", lastUpdated: "2024-10-10" },
  { id: "ar-012", name: "Rule Conflict Report", fileType: "xlsx", capability: "businessRuleIntelligence", version: "v0.1", status: "Generated", owner: "John Doe", lastUpdated: "2024-10-10" },
  { id: "ar-013", name: "Code Complexity Metrics", fileType: "xlsx", capability: "legacyDiscovery", version: "v0.1", status: "Ready for Certification", owner: "Sara Lopez", lastUpdated: "2024-10-09" },
  { id: "ar-014", name: "Impact Assessment", fileType: "docx", capability: "modernizationAssessment", version: "v0.2", status: "In Review", owner: "Priya Nair", lastUpdated: "2024-10-09" },
  { id: "ar-015", name: "Data Dictionary", fileType: "xlsx", capability: "legacyDiscovery", version: "v0.4", status: "Ready for Certification", owner: "Mark Chen", lastUpdated: "2024-10-08" },
  { id: "ar-016", name: "Eligibility Rule Catalog", fileType: "docx", capability: "businessRuleIntelligence", version: "v0.3", status: "Revised", owner: "Sara Lopez", lastUpdated: "2024-10-08" },
  { id: "ar-017", name: "Cost-Benefit Analysis", fileType: "xlsx", capability: "modernizationAssessment", version: "v0.1", status: "Draft", owner: "John Doe", lastUpdated: "2024-10-07" },
  { id: "ar-018", name: "Program Call Graph", fileType: "pdf", capability: "legacyDiscovery", version: "v0.1", status: "Generated", owner: "Mark Chen", lastUpdated: "2024-10-07" },
];

// ── 3. Certified Knowledge Repository (14) ─────────────────────────────
// `sourceEvidenceIds` keeps traceability back to the Evidence Repository.
export const certifiedItems = [
  { id: "ce-001", name: "System Overview", fileType: "docx", capability: "legacyDiscovery", type: "Report", version: "v1.0", certifiedDate: "2024-10-15", approver: "Linda Park", sourceEvidenceIds: ["ev-003", "ev-006"] },
  { id: "ce-002", name: "Application Inventory", fileType: "docx", capability: "legacyDiscovery", type: "Inventory", version: "v1.0", certifiedDate: "2024-10-15", approver: "Linda Park", sourceEvidenceIds: ["ev-001", "ev-002"] },
  { id: "ce-003", name: "Business Rules Catalog", fileType: "docx", capability: "businessRuleIntelligence", type: "Catalog", version: "v1.0", certifiedDate: "2024-10-14", approver: "Raj Mehta", sourceEvidenceIds: ["ev-004", "ev-009"] },
  { id: "ce-004", name: "Data Flow Diagrams", fileType: "pdf", capability: "legacyDiscovery", type: "Diagram", version: "v1.0", certifiedDate: "2024-10-14", approver: "Linda Park", sourceEvidenceIds: ["ev-005"] },
  { id: "ce-005", name: "Interface Inventory", fileType: "docx", capability: "legacyDiscovery", type: "Inventory", version: "v1.0", certifiedDate: "2024-10-13", approver: "Linda Park", sourceEvidenceIds: ["ev-007"] },
  { id: "ce-006", name: "Modernization Assessment", fileType: "pdf", capability: "modernizationAssessment", type: "Report", version: "v1.0", certifiedDate: "2024-10-13", approver: "Raj Mehta", sourceEvidenceIds: ["ev-003", "ev-007"] },
  { id: "ce-007", name: "SME Validation Summary", fileType: "docx", capability: "businessRuleIntelligence", type: "Report", version: "v1.0", certifiedDate: "2024-10-12", approver: "Raj Mehta", sourceEvidenceIds: ["ev-010"] },
  { id: "ce-008", name: "Evidence Traceability Matrix", fileType: "docx", capability: "legacyDiscovery", type: "Matrix", version: "v1.0", certifiedDate: "2024-10-12", approver: "Linda Park", sourceEvidenceIds: ["ev-001", "ev-004", "ev-008"] },
  { id: "ce-009", name: "Decision Tables", fileType: "xlsx", capability: "businessRuleIntelligence", type: "Table", version: "v1.0", certifiedDate: "2024-10-11", approver: "Raj Mehta", sourceEvidenceIds: ["ev-004"] },
  { id: "ce-010", name: "Test Scenarios", fileType: "docx", capability: "businessRuleIntelligence", type: "Test", version: "v1.0", certifiedDate: "2024-10-11", approver: "Raj Mehta", sourceEvidenceIds: ["ev-008"] },
  { id: "ce-011", name: "Data Dictionary", fileType: "xlsx", capability: "legacyDiscovery", type: "Catalog", version: "v1.1", certifiedDate: "2024-10-10", approver: "Linda Park", sourceEvidenceIds: ["ev-005", "ev-014"] },
  { id: "ce-012", name: "Batch Processing Overview", fileType: "pdf", capability: "legacyDiscovery", type: "Report", version: "v1.0", certifiedDate: "2024-10-09", approver: "Linda Park", sourceEvidenceIds: ["ev-011"] },
  { id: "ce-013", name: "Eligibility Rules Matrix", fileType: "xlsx", capability: "businessRuleIntelligence", type: "Matrix", version: "v2.0", certifiedDate: "2024-10-08", approver: "Raj Mehta", sourceEvidenceIds: ["ev-013"] },
  { id: "ce-014", name: "Current-State Architecture", fileType: "pdf", capability: "modernizationAssessment", type: "Diagram", version: "v1.0", certifiedDate: "2024-10-07", approver: "Raj Mehta", sourceEvidenceIds: ["ev-003", "ev-015"] },
];

export const repositoryMocks = {
  evidence: evidenceItems,
  artifacts: artifactItems,
  certified: certifiedItems,
};
