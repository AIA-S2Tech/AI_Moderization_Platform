// MethodologyWorkspaceTemplate (T-17).
// The whole workspace page for one capability:
//   PageHeader (number circle, title, subtitle)
//   Card: WorkspaceHeader + Tabs (Overview, Actions, Artifacts, Evidence, SME Tasks, Issues)
//     Overview   → WorkspaceOverviewTab (T-18)
//     Actions    → ApprovedActionsPanel (left) + RecentArtifactsTable (right) + SummaryStatsRow (bottom)
//     Artifacts / Evidence → RepositoryPanel, compact, filtered to this capability (T-19)
//     SME Tasks / Issues   → EmptyState placeholder (T-20)
// It takes only a capability id – titles, theme, actions, stats and tabs come from
// config/workspaces.js and the numbers from services/workspace.service.js.
// No capability-specific code in here: a workspace page is just
//   <MethodologyWorkspaceTemplate workspaceId="legacyDiscovery" />
//
// Props:
//   workspaceId       : workspace key, e.g. "legacyDiscovery" (WORKSPACE_KEYS)
//   menuItems         : optional ⋮ menu items for the WorkspaceHeader [{ label, onClick }]
//   defaultTab        : tab shown first (default "actions", as in the mockups)
//   syncTabWithUrl    : keep the open tab in the URL (?tab=evidence) – default true
//   onRepositoryAction: optional (repositoryKey, actionId) => void – header button of the
//                       Artifacts / Evidence panels (e.g. open Upload Evidence)
//   ...rest           : props for the outer box

import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";
import Card from "../common/Card";
import Tabs from "../common/Tabs";
import EmptyState from "../common/EmptyState";
import RepositoryPanel from "../repository/RepositoryPanel";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceOverviewTab from "./WorkspaceOverviewTab";
import ApprovedActionsPanel from "./ApprovedActionsPanel";
import RecentArtifactsTable from "./RecentArtifactsTable";
import SummaryStatsRow from "./SummaryStatsRow";
import { DEFAULT_WORKSPACE_TAB, WORKSPACE_TABS, getWorkspaceConfig } from "../../config/workspaces";
import { getWorkspace } from "../../services/workspace.service";

const MethodologyWorkspaceTemplate = ({
  workspaceId,
  menuItems = [],
  defaultTab = DEFAULT_WORKSPACE_TAB,
  syncTabWithUrl = true,
  onRepositoryAction,
  ...rest
}) => {
  const config = getWorkspaceConfig(workspaceId);

  // ── Live data ───────────────────────────────────────────────────────
  const [workspace, setWorkspace] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (!config) return undefined;
    let isCurrent = true; // ignore a slow response after switching workspace
    setLoadError(null);
    getWorkspace(workspaceId)
      .then((data) => isCurrent && setWorkspace(data))
      .catch((err) => isCurrent && setLoadError(err));
    return () => {
      isCurrent = false;
    };
  }, [config, workspaceId, reloadCount]);

  // After an approved action runs: reload quietly (the current data stays on screen
  // until the new data arrives) so Recent Artifacts shows the new artifact.
  const reload = useCallback(() => setReloadCount((n) => n + 1), []);

  if (!config) return null;

  // Skeletons only until this workspace's data is here – never the previous
  // workspace's data while switching, and no flicker on a reload.
  const data = workspace && workspace.id === workspaceId ? workspace : null;
  const showLoading = !data && !loadError;

  // ── Tab content, by tab type (config/workspaces.js WORKSPACE_TABS) ───
  const renderTab = (tab) => {
    switch (tab.type) {
      case "overview":
        return (
          <Box p="cardPadding">
            <WorkspaceOverviewTab workspaceId={workspaceId} workspace={data} isLoading={showLoading} />
          </Box>
        );

      case "actions":
        return (
          <>
            <Grid templateColumns={{ base: "1fr", lg: "minmax(260px, 1fr) 2fr" }} gap={6} p="cardPadding">
              <ApprovedActionsPanel workspaceId={workspaceId} onActionComplete={reload} />
              <RecentArtifactsTable
                artifacts={data ? data.recentArtifacts : []}
                isLoading={showLoading}
              />
            </Grid>
            <Box borderTop="1px solid" borderColor="border.default">
              <SummaryStatsRow
                workspaceId={workspaceId}
                values={data ? data.summary : {}}
                isLoading={showLoading}
                border="none"
                boxShadow="none"
              />
            </Box>
          </>
        );

      case "repository":
        return (
          <Box p="cardPadding">
            <RepositoryPanel
              repository={tab.repository}
              capability={workspaceId}
              compact
              showTabs={false}
              onAction={onRepositoryAction ? (actionId) => onRepositoryAction(tab.repository, actionId) : undefined}
            />
          </Box>
        );

      case "placeholder":
      default:
        return <EmptyState icon={tab.icon} title={tab.title} message={tab.message} />;
    }
  };

  const tabs = WORKSPACE_TABS.map((tab) => ({ id: tab.id, label: tab.label, content: renderTab(tab) }));

  return (
    <Box {...rest}>
      <PageHeader
        number={config.number}
        tone={config.theme}
        title={config.pageTitle}
        subtitle={config.subtitle}
        mb={6}
      />

      <Card padding={0} overflow="hidden">
        <WorkspaceHeader
          title={config.title}
          status={data && data.status}
          percentComplete={data ? data.percentComplete : null}
          isLoading={showLoading}
          menuItems={menuItems}
        />

        {loadError ? (
          <EmptyState
            title="Couldn't load this workspace"
            message="Please try again."
            actionLabel="Retry"
            onAction={() => setReloadCount((n) => n + 1)}
          />
        ) : (
          // key: a new workspace starts again on the default tab
          <Tabs
            key={workspaceId}
            tabs={tabs}
            accent={config.theme}
            defaultValue={defaultTab}
            syncWithUrl={syncTabWithUrl}
            panelPadding={0}
            tabListProps={{ borderTop: "1px solid", borderTopColor: "border.default" }}
          />
        )}
      </Card>
    </Box>
  );
};

export default MethodologyWorkspaceTemplate;
