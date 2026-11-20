// Page: Project Workspace Dashboard (Home) (T-29) – /dashboard, the post-login landing page.
//   PageHeader  (0) PROJECT WORKSPACE (Home)
//   ProjectContextBar
//   Project Dashboard (left) | Methodology Workspaces (centre) | Quick Access (right)
//   Project Repositories (bottom, full width)
// 3 columns from 1024px (theme `lg`), 1 column below.
// Data: dashboard.service (summary) + workspace.service (the 5 capabilities).

import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@chakra-ui/react";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import ProjectContextBar from "../../components/layout/ProjectContextBar";
import ProjectDashboardPanel from "../../components/dashboard/ProjectDashboardPanel";
import WorkspaceCardList from "../../components/dashboard/WorkspaceCardList";
import QuickAccessPanel from "../../components/dashboard/QuickAccessPanel";
import RepositorySummaryPanel from "../../components/dashboard/RepositorySummaryPanel";
import { getDashboardSummary } from "../../services/dashboard.service";
import { getWorkspaces } from "../../services/workspace.service";

const ProjectDashboardPage = () => {
  const [data, setData] = useState(null); // { summary, workspaces }
  const [loadError, setLoadError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let isCurrent = true; // ignore a response that arrives after leaving the page
    setLoadError(null);
    Promise.all([getDashboardSummary(), getWorkspaces()])
      .then(([summary, workspaces]) => isCurrent && setData({ summary, workspaces }))
      .catch((err) => isCurrent && setLoadError(err));
    return () => {
      isCurrent = false;
    };
  }, [reloadCount]);

  const isLoading = !data && !loadError;
  const summary = data ? data.summary : {};
  const workspaces = data ? data.workspaces : [];

  return (
    <Box>
      <PageHeader
        number={0}
        title="Project Workspace"
        titleSuffix="(Home)"
        subtitle="High-level view of project status across the methodology"
        mb={4}
      />

      {loadError ? (
        <EmptyState
          title="Couldn't load the dashboard"
          message="Please try again."
          actionLabel="Retry"
          onAction={() => setReloadCount((n) => n + 1)}
        />
      ) : (
        <Stack spacing="sectionGap">
          <ProjectContextBar context={summary.projectContext} />

          <Grid
            // minmax(0, …): columns may shrink below their content, so the wide
            // Capability Progress table scrolls inside its box instead of widening the page.
            // From 1440px the mockup proportions; 1024–1439px gives Quick Access a bit more room.
            templateColumns={{
              base: "minmax(0, 1fr)",
              lg: "minmax(0, 4fr) minmax(0, 3.3fr) minmax(0, 2.7fr)",
              xl: "minmax(0, 4.5fr) minmax(0, 3.5fr) minmax(0, 2.2fr)",
            }}
            gap="sectionGap"
            alignItems="start"
          >
            <ProjectDashboardPanel
              workspaces={workspaces}
              metrics={summary.keyMetrics}
              lastUpdated={summary.lastUpdated}
              isLoading={isLoading}
            />
            <WorkspaceCardList workspaces={workspaces} isLoading={isLoading} />
            <QuickAccessPanel counts={summary.quickAccessCounts} />
          </Grid>

          <RepositorySummaryPanel summaries={summary.repositories} />
        </Stack>
      )}
    </Box>
  );
};

export default ProjectDashboardPage;
