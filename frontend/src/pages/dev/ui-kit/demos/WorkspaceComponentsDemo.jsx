// UI Kit demo – workspace components (T-15, T-16) on workspace config + mock service (T-13).
// Pick a workspace: everything below changes from config/workspaces.js and
// services/workspace.service.js only. WorkspaceHeader (T-14) has its own demo; the
// full page layout comes with the MethodologyWorkspaceTemplate (T-17).

import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import Card from "../../../../components/common/Card";
import Tabs from "../../../../components/common/Tabs";
import ApprovedActionsPanel from "../../../../components/workspace/ApprovedActionsPanel";
import RecentArtifactsTable from "../../../../components/workspace/RecentArtifactsTable";
import SummaryStatsRow from "../../../../components/workspace/SummaryStatsRow";
import { WORKSPACE_LIST, getWorkspaceConfig } from "../../../../config/workspaces";
import { getWorkspace } from "../../../../services/workspace.service";
import { DemoSection, DemoRow } from "../DemoSection";

const workspaceTabs = WORKSPACE_LIST.map((w) => ({ id: w.id, label: `${w.number}. ${w.title}` }));

const WorkspaceComponentsDemo = () => {
  const [workspaceId, setWorkspaceId] = useState(WORKSPACE_LIST[0].id);
  const [workspace, setWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastEvent, setLastEvent] = useState("");
  const config = getWorkspaceConfig(workspaceId);

  const load = useCallback(() => {
    let isCurrent = true;
    setIsLoading(true);
    getWorkspace(workspaceId)
      .then((data) => isCurrent && setWorkspace(data))
      .finally(() => isCurrent && setIsLoading(false));
    return () => {
      isCurrent = false;
    };
  }, [workspaceId]);

  useEffect(() => load(), [load]);

  const data = isLoading ? null : workspace;

  return (
    <DemoSection
      id="workspace-components"
      title="Workspace components"
      description="components/workspace/ – ApprovedActionsPanel, RecentArtifactsTable, SummaryStatsRow. Driven by config/workspaces.js, data from services/workspace.service.js (mock). Click an action → confirm → toast → new artifact appears."
    >
      <DemoRow label="Workspace (switch to compare navy / red and empty Recent Artifacts)" align="stretch">
        <Card padding={0} w="100%">
          <Tabs
            tabs={workspaceTabs}
            accent={config.theme}
            value={workspaceId}
            onChange={setWorkspaceId}
            tabListProps={{ borderTopRadius: "calc(var(--chakra-radii-xl) - 1px)" }}
          />
        </Card>
      </DemoRow>

      <Text textStyle="caption" mt={2}>
        Last event: {lastEvent || "–"}
      </Text>

      <DemoRow label="ApprovedActionsPanel + RecentArtifactsTable + SummaryStatsRow" align="stretch">
        <Card padding={0} w="100%">
          <Grid templateColumns={{ base: "1fr", lg: "minmax(260px, 1fr) 2fr" }} gap={6} p="cardPadding">
            <ApprovedActionsPanel
              workspaceId={workspaceId}
              onActionComplete={(artifact) => {
                setLastEvent(`action done – new artifact "${artifact.name}"`);
                load();
              }}
            />
            <RecentArtifactsTable
              artifacts={data ? data.recentArtifacts : []}
              isLoading={isLoading}
              onArtifactClick={(a) => setLastEvent(`artifact clicked: "${a.name}"`)}
            />
          </Grid>

          <Box borderTop="1px solid" borderColor="border.default">
            <SummaryStatsRow
              workspaceId={workspaceId}
              values={data ? data.summary : {}}
              isLoading={isLoading}
              border="none"
              boxShadow="none"
            />
          </Box>
        </Card>
      </DemoRow>
    </DemoSection>
  );
};

export default WorkspaceComponentsDemo;
