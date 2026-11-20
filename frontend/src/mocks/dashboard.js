// Mock data for the Project Workspace Dashboard (T-29).
// Read only through services/dashboard.service.js – pages never import this file.
// Values match the dashboard mockup. The capability rows and workspace cards are
// not here: they come from services/workspace.service.js (same data as the workspaces).
//
// lastUpdated is a UTC timestamp, as the backend will send it (13:30 UTC = 9:30 AM US Eastern).
// Repository counts are the project totals shown on the dashboard (324 / 128 / 54);
// the repository pages list sample items only.

export const dashboardMock = {
  projectContext: {
    client: "State of Example",
    project: "Eligibility Modernization",
    system: "Eligibility Mainframe (ELIG)",
    methodology: "v1.0",
    status: "In Progress",
    maturity: ["Discovery", "Assessment"],
  },

  lastUpdated: "2026-05-21T13:30:00",

  // ids match config/dashboardMetrics.js
  keyMetrics: {
    evidenceCoverage: 78,
    artifactsGenerated: 128,
    artifactsValidated: 54,
    openSmeQuestions: 23,
    unresolvedAssumptions: 14,
    conflictingEvidence: 7,
    humanReviewHours: 132,
    aiProcessingCost: 412,
    rework: 8,
  },

  // countKey values from config/quickAccessItems.js
  quickAccessCounts: {
    smeTasks: 23,
    issues: 21,
  },

  // keys match config/repositories.js REPOSITORY_KEYS (config/repositorySummaryCards.js)
  repositories: {
    evidence: { count: 324, lastUpdated: "2026-05-21" },
    artifacts: { count: 128, lastUpdated: "2026-05-21" },
    certified: { count: 54, lastUpdated: "2026-05-21" },
  },
};
