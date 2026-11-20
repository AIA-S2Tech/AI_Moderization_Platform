// Dashboard service (T-29).
// The only way the dashboard gets its summary data. Returns mock data for now; the
// dashboard summary API comes next sprint, when the function body is swapped for an
// API call. The function name and returned shape stay the same.
//
// Capability progress and workspace cards use workspace.service getWorkspaces().

import { dashboardMock } from "../mocks/dashboard";

// Small delay so loading states are visible and behave like a real request.
const MOCK_DELAY_MS = 300;

const respond = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS));

/**
 * Project-level summary for the dashboard.
 * @returns {Promise<{
 *   projectContext: object,          // ProjectContextBar
 *   lastUpdated: string,             // UTC timestamp
 *   keyMetrics: object,              // { [metricId]: value }
 *   quickAccessCounts: object,       // { smeTasks, issues }
 *   repositories: object             // { evidence|artifacts|certified: { count, lastUpdated } }
 * }>}
 */
export const getDashboardSummary = async () =>
  respond({
    ...dashboardMock,
    projectContext: { ...dashboardMock.projectContext, maturity: [...dashboardMock.projectContext.maturity] },
    keyMetrics: { ...dashboardMock.keyMetrics },
    quickAccessCounts: { ...dashboardMock.quickAccessCounts },
    repositories: Object.fromEntries(
      Object.entries(dashboardMock.repositories).map(([key, value]) => [key, { ...value }])
    ),
  });
