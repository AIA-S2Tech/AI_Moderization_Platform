// Project scope service (S2-01).
// The only way the scope screens get or change project / scope data. Returns mock
// data for now (mocks/scope.js); S2-20 swaps each body for the scope APIs (S2-27,
// S2-30, S2-31, S2-33). Function names, arguments and returned shapes stay the same.
//
// Every function is async (returns a Promise), exactly like the real API will be.

import {
  deliverableStatusMock,
  projectLeadsMock,
  projectMock,
  scopeVersionsMock,
} from "../mocks/scope";
import {
  DELIVERABLES,
  METHODOLOGY_VERSIONS,
  findMissingPrerequisites,
  getActionsInScope,
  getCapabilitiesInScope,
  getDeliverable,
  getDeliverablesByCapability,
} from "../config/methodology";

// Small delay so loading states are visible and behave like a real request.
const MOCK_DELAY_MS = 300;

const respond = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS));

const clone = (value) => JSON.parse(JSON.stringify(value));

// In-memory copies so drafts saved during a session stick until the page is reloaded.
let project = clone(projectMock);
let scopeVersions = clone(scopeVersionsMock);
const deliverableStatus = { ...deliverableStatusMock };

const activeVersion = () => scopeVersions.find((v) => v.status === "Active") || null;
const draftVersion = () => scopeVersions.find((v) => v.status === "Draft") || null;

// "3 / 5 workspaces | 8 / 13 deliverables"
const counts = (deliverableIds) => ({
  workspaces: getCapabilitiesInScope(deliverableIds).length,
  totalWorkspaces: getDeliverablesByCapability().length,
  deliverables: deliverableIds.length,
  totalDeliverables: DELIVERABLES.length,
});

const withCounts = (version) => version && { ...clone(version), ...counts(version.deliverableIds) };

// ── Project & methodology ──────────────────────────────────────────────

/** The current project's details (concept 1). */
export const getProject = async () => respond(clone(project));

/** Save project details, e.g. Save draft on Create project. */
export const updateProject = async (changes) => {
  project = { ...project, ...changes };
  return respond(clone(project));
};

/** People with the LEAD role – Project lead picker. */
export const getProjectLeads = async () => respond(clone(projectLeadsMock));

/** Methodology versions, e.g. { status: "Published" } for the Create project picker. */
export const getMethodologyVersions = async ({ status } = {}) =>
  respond(clone(METHODOLOGY_VERSIONS.filter((v) => !status || v.status === status)));

/**
 * Deliverables of a methodology version grouped by workspace, with their actions
 * and prerequisites (concept 2 cards).
 */
export const getMethodologyDeliverables = async () => respond(clone(getDeliverablesByCapability()));

// ── Scope ──────────────────────────────────────────────────────────────

/** Active scope and the open draft (null when there is none), each with counters. */
export const getProjectScope = async () =>
  respond({ active: withCounts(activeVersion()), draft: withCounts(draftVersion()) });

/** Every scope version, newest last (concept 5 history). */
export const getScopeVersions = async () => respond(scopeVersions.map(withCounts));

/**
 * Save the selected deliverables as the draft scope (Save draft on concept 2).
 * Creates the draft from the active scope's numbering when there is none.
 */
export const saveScopeDraft = async (deliverableIds) => {
  const ids = deliverableIds.filter((id) => getDeliverable(id));
  let draft = draftVersion();
  if (!draft) {
    const next = scopeVersions.length;
    draft = {
      id: `scope-v1.${next}`,
      version: `v1.${next}`,
      title: "Proposed change",
      status: "Draft",
      summary: "",
      reason: "",
      effectiveDate: null,
      requestedBy: "Project Lead",
      authorizedBy: null,
    };
    scopeVersions = [...scopeVersions, draft];
  }
  draft.deliverableIds = ids;
  return respond(withCounts(draft));
};

/**
 * Dependency check (concept 2): prerequisites of the selected deliverables that are
 * not selected. Ones already complete in the project count as satisfied – an
 * existing validated artifact may satisfy a prerequisite.
 * @returns {Promise<{ missing: object[], satisfied: object[], blocking: boolean }>}
 */
export const checkScopeDependencies = async (deliverableIds) => {
  const complete = Object.keys(deliverableStatus).filter((id) => deliverableStatus[id] === "Complete");
  const unselected = findMissingPrerequisites(deliverableIds);
  const missing = findMissingPrerequisites(deliverableIds, complete);
  const satisfied = unselected.filter(
    (u) => !missing.some((m) => m.deliverableId === u.deliverableId && m.prerequisiteId === u.prerequisiteId)
  );
  return respond({ missing, satisfied, blocking: missing.some((m) => m.required) });
};

// ── Progress (concepts 3 & 4) ──────────────────────────────────────────

/**
 * One workspace's deliverables: in scope with status, or out of scope (concept 4),
 * plus which approved actions the scope allows.
 * @param {string} capability – workspace key, e.g. "modernizationAssessment"
 */
export const getWorkspaceDeliverables = async (capability) => {
  const inScope = new Set(activeVersion()?.deliverableIds || []);
  const deliverables = DELIVERABLES.filter((d) => d.capability === capability).map((d) => ({
    id: d.id,
    name: d.name,
    inScope: inScope.has(d.id),
    status: inScope.has(d.id) ? deliverableStatus[d.id] || "Not Started" : "Out of Scope",
  }));
  return respond({
    capability,
    inScopeCount: deliverables.filter((d) => d.inScope).length,
    total: deliverables.length,
    deliverables,
    enabledActionIds: [...getActionsInScope([...inScope])],
  });
};

/**
 * Project progress from in-scope deliverables only (out of scope excluded):
 * overall "5 / 8 (62.5%)" and per workspace "3 of 3 deliverables complete".
 */
export const getProjectProgress = async () => {
  const inScopeIds = activeVersion()?.deliverableIds || [];
  const isComplete = (id) => deliverableStatus[id] === "Complete";
  const workspaces = getDeliverablesByCapability().map(({ capability, step, label, deliverables }) => {
    const ids = deliverables.map((d) => d.id).filter((id) => inScopeIds.includes(id));
    const completed = ids.filter(isComplete).length;
    return {
      capability,
      step,
      label,
      inScope: ids.length > 0,
      completed,
      total: ids.length,
      percent: ids.length ? Math.round((completed / ids.length) * 100) : null,
    };
  });
  const completed = inScopeIds.filter(isComplete).length;
  return respond({
    scopeVersion: activeVersion()?.version || null,
    completed,
    total: inScopeIds.length,
    percent: inScopeIds.length ? Math.round((completed / inScopeIds.length) * 1000) / 10 : 0,
    workspaces,
  });
};
