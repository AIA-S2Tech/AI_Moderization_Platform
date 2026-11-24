// Mock project scope data (S2-01).
// Read only through services/scope.service.js – pages never import this file.
// Values match the Project Scope concept screens (S2Tech_Project_Scope_Conceptual_Screens.pdf).
// Deliverable ids come from config/methodology.js.

const LEGACY_DISCOVERY = ["system-overview", "application-component-inventory", "evidence-gap-analysis"];
const BUSINESS_RULES = ["business-rule-catalog", "rule-traceability-matrix", "sme-validation-package"];
// Modernization Prioritization Matrix is out of scope (concept 2).
const MODERNIZATION_ASSESSMENT = ["modernization-assessment", "modernization-alternatives-recommended-path"];
const TARGETED_MODERNIZATION = ["target-state-definition", "phased-modernization-roadmap"];

// Project details (concept 1).
export const projectMock = {
  id: 1,
  client: "State of Example",
  name: "Eligibility Modernization",
  system: "Eligibility Mainframe (ELIG)",
  methodologyVersion: "v1.0",
  leadId: "u-lead-1",
  status: "Active",
};

// People who may lead a project (LEAD role) – for the Project lead picker.
export const projectLeadsMock = [
  { id: "u-lead-1", name: "Linda Park" },
  { id: "u-lead-2", name: "Raj Mehta" },
  { id: "u-lead-3", name: "Priya Nair" },
];

// Scope history (concept 5): v1.0 → v1.1 (active) → v1.2 (proposed).
export const scopeVersionsMock = [
  {
    id: "scope-v1.0",
    version: "v1.0",
    title: "Initial baseline",
    status: "Superseded",
    summary: "Legacy Discovery + Business Rule Intelligence",
    deliverableIds: [...LEGACY_DISCOVERY, ...BUSINESS_RULES],
    reason: "Initial project scope",
    effectiveDate: "2026-10-01",
    requestedBy: "Project Lead",
    authorizedBy: "Linda Park",
  },
  {
    id: "scope-v1.1",
    version: "v1.1",
    title: "Scope expansion",
    status: "Active",
    summary: "Added Modernization Assessment",
    deliverableIds: [...LEGACY_DISCOVERY, ...BUSINESS_RULES, ...MODERNIZATION_ASSESSMENT],
    reason: "Client asked for a modernization assessment",
    effectiveDate: "2026-11-02",
    requestedBy: "Project Lead",
    authorizedBy: "Linda Park",
  },
  {
    id: "scope-v1.2",
    version: "v1.2",
    title: "Proposed change",
    status: "Draft",
    summary: "Add Targeted Modernization",
    deliverableIds: [...LEGACY_DISCOVERY, ...BUSINESS_RULES, ...MODERNIZATION_ASSESSMENT, ...TARGETED_MODERNIZATION],
    reason: "Client requests roadmap planning",
    effectiveDate: null, // "Pending authorization"
    requestedBy: "Project Lead",
    authorizedBy: null,
  },
];

// Status of each in-scope deliverable (concept 3: 5 of 8 complete).
// Not Started | In Progress | Complete
export const deliverableStatusMock = {
  "system-overview": "Complete",
  "application-component-inventory": "Complete",
  "evidence-gap-analysis": "Complete",
  "business-rule-catalog": "Complete",
  "rule-traceability-matrix": "Complete",
  "sme-validation-package": "In Progress",
  "modernization-assessment": "Not Started",
  "modernization-alternatives-recommended-path": "Not Started",
};
