// UI Kit demo – dashboard components (T-25 – T-28) on mock data (T-29 services).
// Each section on its own, with a Loading toggle. The full page layout is /dashboard.

import React, { useEffect, useState } from "react";
import { Box, Switch, FormControl, FormLabel } from "@chakra-ui/react";
import ProjectDashboardPanel from "../../../../components/dashboard/ProjectDashboardPanel";
import WorkspaceCardList from "../../../../components/dashboard/WorkspaceCardList";
import QuickAccessPanel from "../../../../components/dashboard/QuickAccessPanel";
import RepositorySummaryPanel from "../../../../components/dashboard/RepositorySummaryPanel";
import { getDashboardSummary } from "../../../../services/dashboard.service";
import { getWorkspaces } from "../../../../services/workspace.service";
import { DemoSection, DemoRow } from "../DemoSection";

const DashboardComponentsDemo = () => {
  const [data, setData] = useState(null);
  const [forceLoading, setForceLoading] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    Promise.all([getDashboardSummary(), getWorkspaces()]).then(
      ([summary, workspaces]) => isCurrent && setData({ summary, workspaces })
    );
    return () => {
      isCurrent = false;
    };
  }, []);

  const isLoading = forceLoading || !data;
  const summary = data ? data.summary : {};
  const workspaces = data ? data.workspaces : [];

  return (
    <DemoSection
      id="dashboard-components"
      title="Dashboard components"
      description="components/dashboard/ – ProjectDashboardPanel (CapabilityProgressTable + KeyMetricsGrid), WorkspaceCardList (WorkspaceCard), QuickAccessPanel (QuickAccessItem), RepositorySummaryPanel (RepositorySummaryCard). Items from config, values from services/dashboard.service.js + workspace.service.js (mock). Cards and quick-access items are links."
    >
      <FormControl display="flex" alignItems="center" gap={2}>
        <Switch id="dashboard-demo-loading" isChecked={forceLoading} onChange={(e) => setForceLoading(e.target.checked)} />
        <FormLabel htmlFor="dashboard-demo-loading" mb={0} fontSize="sm">
          Show loading state
        </FormLabel>
      </FormControl>

      <DemoRow label="ProjectDashboardPanel (T-25)" align="stretch">
        <Box w="100%" maxW="720px">
          <ProjectDashboardPanel
            workspaces={workspaces}
            metrics={summary.keyMetrics}
            lastUpdated={summary.lastUpdated}
            isLoading={isLoading}
          />
        </Box>
      </DemoRow>

      <DemoRow label="WorkspaceCardList (T-26)" align="stretch">
        <Box w="100%" maxW="560px">
          <WorkspaceCardList workspaces={workspaces} isLoading={isLoading} />
        </Box>
      </DemoRow>

      <DemoRow label="QuickAccessPanel (T-27) – SME Tasks and Issues have no page yet, so they are not links" align="stretch">
        <Box w="100%" maxW="360px">
          <QuickAccessPanel counts={isLoading ? undefined : summary.quickAccessCounts} />
        </Box>
      </DemoRow>

      <DemoRow label="RepositorySummaryPanel (T-28)" align="stretch">
        <Box w="100%">
          <RepositorySummaryPanel summaries={isLoading ? undefined : summary.repositories} />
        </Box>
      </DemoRow>
    </DemoSection>
  );
};

export default DashboardComponentsDemo;
