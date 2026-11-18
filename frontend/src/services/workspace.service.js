// Workspace service (T-13).
// The only way pages / templates get workspace data. Returns mock data for now;
// the workspace APIs come next sprint, when each function body is swapped for an
// API call. The function names, arguments and returned shapes stay the same.
//
// Every function is async (returns a Promise), exactly like the real API will be.

import { workspaceMocks } from "../mocks/workspaces";
import { WORKSPACE_ROUTES } from "../config/routes";
import { todayDate } from "../utils/date";

// Small delay so loading states are visible and behave like a real request.
const MOCK_DELAY_MS = 300;

const respond = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS));

// In-memory copy so artifacts created by Run Action show up until the page is reloaded.
const store = Object.fromEntries(
  Object.entries(workspaceMocks).map(([id, ws]) => [
    id,
    { ...ws, summary: { ...ws.summary }, recentArtifacts: [...ws.recentArtifacts] },
  ])
);

const getStored = (workspaceId) => {
  const ws = store[workspaceId];
  if (!ws) throw new Error(`Unknown workspace "${workspaceId}"`);
  return ws;
};

// Copies so callers can never change the stored data by accident.
const copy = (id, ws) => ({
  id,
  ...ws,
  summary: { ...ws.summary },
  recentArtifacts: ws.recentArtifacts.map((a) => ({ ...a })),
});

/**
 * One workspace's live data.
 * @param {string} workspaceId – key from config/routes.js WORKSPACE_ROUTES, e.g. "legacyDiscovery"
 * @returns {Promise<{ id, status, percentComplete, validationPercent, openIssues,
 *                     summary: object, recentArtifacts: object[] }>}
 */
export const getWorkspace = async (workspaceId) => respond(copy(workspaceId, getStored(workspaceId)));

/**
 * All 5 workspaces in methodology order – for the dashboard (Capability Progress,
 * workspace cards).
 * @returns {Promise<object[]>}
 */
export const getWorkspaces = async () =>
  respond(WORKSPACE_ROUTES.filter((w) => store[w.key]).map((w) => copy(w.key, store[w.key])));

/**
 * Run an approved action. For now it creates a new "Generated" artifact at the top
 * of the workspace's Recent Artifacts (the real AI workflow comes with the API).
 * @param {string} workspaceId
 * @param {{ id: string, label: string }} action – from config/workspaces.js
 * @returns {Promise<object>} the new artifact
 */
export const runWorkspaceAction = async (workspaceId, action) => {
  const ws = getStored(workspaceId);
  const artifact = {
    id: `${workspaceId}-${action.id}-${Date.now()}`,
    // "Generate System Overview" → "System Overview"
    name: action.label.replace(/^Generate\s+/i, ""),
    type: "Document",
    version: "0.1",
    status: "Generated",
    updated: todayDate(),
  };
  ws.recentArtifacts = [artifact, ...ws.recentArtifacts];
  return respond({ ...artifact });
};
