// Methodology deliverables (S2-01).
// The S2Tech methodology v1.0: 13 standard deliverables mapped to the 5 workspaces
// (Project Scope concept, screen 2). A project's scope is a selection of these
// deliverables – users pick deliverables, never individual AI actions.
//
// Per deliverable:
//   id            : stable key, used by scope versions and project progress
//   name          : label shown on the scope screens
//   capability    : workspace key (config/routes.js WORKSPACE_ROUTES)
//   actions       : approved actions that serve it – ids from config/workspaces.js.
//                   An action is available when at least one in-scope deliverable uses it,
//                   so shared prerequisite actions stay available (concept 4).
//   prerequisites : [{ id, required }] – deliverables whose output this one needs.
//                   Only unmet *required* prerequisites block activation (S2-10).
//


import { WORKSPACE_ROUTES } from "./routes";

export const METHODOLOGY_VERSIONS = [
  { id: "v1.0", label: "v1.0", status: "Published" },
];

export const DEFAULT_METHODOLOGY_VERSION = "v1.0";

const prereq = (id, required = true) => ({ id, required });

export const DELIVERABLES = [
  // ── 1. Legacy Discovery ─────────────────────────────────────────────
  {
    id: "system-overview",
    name: "System Overview",
    capability: "legacyDiscovery",
    actions: ["generate-system-overview", "generate-process-flow", "generate-dependency-analysis"],
    prerequisites: [],
  },
  {
    id: "application-component-inventory",
    name: "Application / Component Inventory",
    capability: "legacyDiscovery",
    actions: ["generate-application-inventory", "generate-interface-inventory", "generate-dependency-analysis"],
    prerequisites: [],
  },
  {
    id: "evidence-gap-analysis",
    name: "Evidence Gap Analysis",
    capability: "legacyDiscovery",
    actions: ["identify-evidence-gaps", "generate-sme-questions"],
    prerequisites: [prereq("system-overview", false), prereq("application-component-inventory", false)],
  },

  // ── 2. Business Rule Intelligence ───────────────────────────────────
  {
    id: "business-rule-catalog",
    name: "Business Rule Catalog",
    capability: "businessRuleIntelligence",
    actions: [
      "extract-business-rules",
      "identify-conflicting-rules",
      "identify-unconfirmed-rules",
      "generate-decision-tables",
    ],
    prerequisites: [prereq("application-component-inventory")],
  },
  {
    id: "rule-traceability-matrix",
    name: "Rule Traceability Matrix",
    capability: "businessRuleIntelligence",
    actions: ["generate-rule-traceability"],
    prerequisites: [prereq("business-rule-catalog")],
  },
  {
    id: "sme-validation-package",
    name: "SME Validation Package",
    capability: "businessRuleIntelligence",
    actions: ["generate-sme-validation-package", "generate-test-scenarios"],
    prerequisites: [prereq("business-rule-catalog")],
  },

  // ── 3. Modernization Assessment ─────────────────────────────────────
  {
    id: "modernization-assessment",
    name: "Modernization Assessment",
    capability: "modernizationAssessment",
    actions: ["assess-technical-condition", "assess-business-impact", "generate-assessment-report"],
    prerequisites: [prereq("system-overview"), prereq("business-rule-catalog", false)],
  },
  {
    id: "modernization-prioritization-matrix",
    name: "Modernization Prioritization Matrix",
    capability: "modernizationAssessment",
    actions: ["identify-change-candidates", "risk-and-effort-assessment", "assess-business-impact"],
    prerequisites: [prereq("modernization-assessment")],
  },
  {
    id: "modernization-alternatives-recommended-path",
    name: "Modernization Alternatives & Recommended Path",
    capability: "modernizationAssessment",
    actions: ["analyze-modernization-options", "generate-assessment-report"],
    prerequisites: [prereq("modernization-assessment")],
  },

  // ── 4. Targeted Modernization ───────────────────────────────────────
  {
    id: "target-state-definition",
    name: "Target-State Definition",
    capability: "targetedModernization",
    actions: [
      "define-modernization-path",
      "identify-reuse-opportunities",
      "integration-strategy",
      "data-migration-strategy",
    ],
    prerequisites: [prereq("modernization-alternatives-recommended-path")],
  },
  {
    id: "phased-modernization-roadmap",
    name: "Phased Modernization Roadmap",
    capability: "targetedModernization",
    actions: ["define-sequence-and-phases", "generate-roadmap"],
    prerequisites: [prereq("target-state-definition")],
  },

  // ── 5. AI-Assisted Code Transformation ──────────────────────────────
  {
    id: "targeted-transformation-package",
    name: "Targeted Transformation Package",
    capability: "aiCodeTransformation",
    actions: [
      "analyze-code",
      "generate-code-explanations",
      "identify-refactoring-opportunities",
      "generate-code-conversion-plan",
      "accelerate-code-transformation",
    ],
    prerequisites: [prereq("target-state-definition"), prereq("business-rule-catalog")],
  },
  {
    id: "transformation-validation-traceability-package",
    name: "Transformation Validation & Traceability Package",
    capability: "aiCodeTransformation",
    actions: ["generate-unit-test-cases", "review-and-validate-code-changes"],
    prerequisites: [prereq("targeted-transformation-package"), prereq("rule-traceability-matrix", false)],
  },
];

// ── Helpers (pure – used by the scope service, screens and tests) ──────

const byId = Object.fromEntries(DELIVERABLES.map((d) => [d.id, d]));

export const getDeliverable = (id) => byId[id] || null;

/** The 5 workspaces in methodology order, each with its deliverables. */
export const getDeliverablesByCapability = () =>
  WORKSPACE_ROUTES.map((w) => ({
    capability: w.key,
    step: w.step,
    label: w.label,
    deliverables: DELIVERABLES.filter((d) => d.capability === w.key),
  }));

/** Workspaces with at least one selected deliverable. */
export const getCapabilitiesInScope = (deliverableIds) =>
  [...new Set(deliverableIds.map((id) => byId[id]?.capability).filter(Boolean))];

/**
 * Action ids available for the selected deliverables. An action used by any
 * in-scope deliverable stays available, even if another (out-of-scope)
 * deliverable uses it too.
 */
export const getActionsInScope = (deliverableIds) =>
  new Set(deliverableIds.flatMap((id) => byId[id]?.actions || []));

/**
 * Prerequisites of the selected deliverables that are neither selected nor
 * already satisfied (e.g. by an existing certified item).
 * @param {string[]} selectedIds
 * @param {string[]} [satisfiedIds] – deliverables already complete / certified
 * @returns {{ deliverableId, prerequisiteId, required }[]}
 */
export const findMissingPrerequisites = (selectedIds, satisfiedIds = []) => {
  const available = new Set([...selectedIds, ...satisfiedIds]);
  return selectedIds.flatMap((id) =>
    (byId[id]?.prerequisites || [])
      .filter((p) => !available.has(p.id))
      .map((p) => ({ deliverableId: id, prerequisiteId: p.id, required: p.required }))
  );
};
