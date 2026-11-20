// WorkspaceCardList (T-26).
// Centre section of the dashboard: "METHODOLOGY WORKSPACES" with the 5 WorkspaceCards.
// Cards (number, title, description, tone, route) come from config/workspaces.js;
// status and % complete from workspace.service getWorkspaces().
//
// Props:
//   workspaces : workspace.service getWorkspaces() result [{ id, status, percentComplete }]
//   isLoading  : skeletons instead of the status & percentage
//   ...rest    : props for the SectionCard
//
// Example:
//   <WorkspaceCardList workspaces={workspaces} isLoading={!workspaces} />

import React from "react";
import { Stack } from "@chakra-ui/react";
import SectionCard from "../common/SectionCard";
import WorkspaceCard from "./WorkspaceCard";
import { WORKSPACE_LIST } from "../../config/workspaces";

const WorkspaceCardList = ({ workspaces = [], isLoading = false, ...rest }) => {
  const byId = Object.fromEntries(workspaces.map((ws) => [ws.id, ws]));

  return (
    <SectionCard title="Methodology Workspaces" showDivider={false} bodyProps={{ pt: 0 }} {...rest}>
      <Stack as="nav" aria-label="Methodology workspaces" spacing={3}>
        {WORKSPACE_LIST.map((config) => {
          const live = byId[config.id] || {};
          return (
            <WorkspaceCard
              key={config.id}
              number={config.number}
              title={config.title}
              description={config.subtitle}
              tone={config.theme}
              status={live.status}
              percentComplete={live.percentComplete}
              to={config.path}
              isLoading={isLoading}
            />
          );
        })}
      </Stack>
    </SectionCard>
  );
};

export default WorkspaceCardList;
