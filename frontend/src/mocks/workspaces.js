// Mock data for the 5 methodology workspaces (T-13).
// Read only through services/workspace.service.js – pages never import this file.
//
// Numbers, statuses and artifacts match the workspace mockups and the dashboard's
// Capability Progress table. `summary` keys match the stat ids in config/workspaces.js.
// Percentages are numbers (91 → "91%"); null = not started yet (shown as "—").

export const workspaceMocks = {
  legacyDiscovery: {
    status: "Certified",
    percentComplete: 100,
    validationPercent: 100,
    openIssues: 0,
    summary: { evidenceItems: 124, evidenceTypes: 11, coverage: 91, gapsIdentified: 3 },
    recentArtifacts: [
      { id: "ld-art-1", name: "System Overview", type: "Document", version: "1.2", status: "Certified", updated: "2026-05-20" },
      { id: "ld-art-2", name: "Application Inventory", type: "Document", version: "1.1", status: "Certified", updated: "2026-05-19" },
      { id: "ld-art-3", name: "Process Flow (Level 1)", type: "Diagram", version: "1.0", status: "Certified", updated: "2026-05-18" },
      { id: "ld-art-4", name: "Dependency Analysis", type: "Document", version: "1.0", status: "Certified", updated: "2026-05-18" },
      { id: "ld-art-5", name: "Interface Inventory", type: "Document", version: "1.1", status: "Certified", updated: "2026-05-19" },
      { id: "ld-art-6", name: "Evidence Gap Report", type: "Document", version: "1.0", status: "Certified", updated: "2026-05-17" },
    ],
  },

  businessRuleIntelligence: {
    status: "In Progress",
    percentComplete: 82,
    validationPercent: 64,
    openIssues: 17,
    summary: { rulesExtracted: 1248, validatedBySmes: 64, unresolvedRules: 14, smeTasks: 17 },
    recentArtifacts: [
      { id: "bri-art-1", name: "Business Rule Catalog", type: "Document", version: "1.4", status: "In Review", updated: "2026-05-21" },
      { id: "bri-art-2", name: "Rule Traceability Matrix", type: "Document", version: "1.1", status: "In Review", updated: "2026-05-20" },
      { id: "bri-art-3", name: "Decision Tables", type: "Document", version: "1.0", status: "In Review", updated: "2026-05-19" },
      { id: "bri-art-4", name: "Conflicting Rules Report", type: "Document", version: "1.0", status: "In Review", updated: "2026-05-18" },
      { id: "bri-art-5", name: "SME Validation Package", type: "Package", version: "1.1", status: "Pending SME", updated: "2026-05-21" },
    ],
  },

  modernizationAssessment: {
    status: "Started",
    percentComplete: 15,
    validationPercent: null,
    openIssues: 4,
    summary: { changeCandidates: 28, optionsEvaluated: 6, highRisks: 5, dataQuality: "Fair" },
    recentArtifacts: [
      { id: "ma-art-1", name: "Change Candidates", type: "Document", version: "0.8", status: "Draft", updated: "2026-05-20" },
      { id: "ma-art-2", name: "Technical Condition Report", type: "Document", version: "0.6", status: "Draft", updated: "2026-05-19" },
      { id: "ma-art-3", name: "Business Impact Analysis", type: "Document", version: "0.5", status: "Draft", updated: "2026-05-19" },
    ],
  },

  targetedModernization: {
    status: "Not Started",
    percentComplete: 0,
    validationPercent: null,
    openIssues: null,
    summary: { plansDefined: 0, phasesDefined: 0, reuseOpportunities: 0, roadmapCreated: 0 },
    recentArtifacts: [],
  },

  aiCodeTransformation: {
    status: "Not Started",
    percentComplete: 0,
    validationPercent: null,
    openIssues: null,
    summary: { codeAnalyzed: 0, refactoringIdeas: 0, testsGenerated: 0, codeConverted: 0 },
    recentArtifacts: [],
  },
};
