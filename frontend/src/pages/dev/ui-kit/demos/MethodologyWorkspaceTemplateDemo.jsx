// UI Kit demo – MethodologyWorkspaceTemplate (T-17) with its tabs (T-18 – T-20).
// The template takes only a workspace id; switch workspaces to see that everything
// (number, theme, actions, stats, Artifacts/Evidence rows) comes from config + service.

import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import Card from "../../../../components/common/Card";
import Tabs from "../../../../components/common/Tabs";
import MethodologyWorkspaceTemplate from "../../../../components/workspace/MethodologyWorkspaceTemplate";
import { WORKSPACE_LIST, getWorkspaceConfig } from "../../../../config/workspaces";
import { DemoSection, DemoRow } from "../DemoSection";

const workspaceTabs = WORKSPACE_LIST.map((w) => ({ id: w.id, label: `${w.number}. ${w.title}` }));

const MethodologyWorkspaceTemplateDemo = () => {
  const [workspaceId, setWorkspaceId] = useState(WORKSPACE_LIST[0].id);
  const [lastEvent, setLastEvent] = useState("");
  const config = getWorkspaceConfig(workspaceId);

  const menuItems = ["Export Summary", "Workspace Settings"].map((label) => ({
    label,
    onClick: () => setLastEvent(`⋮ "${label}"`),
  }));

  return (
    <DemoSection
      id="methodology-workspace-template"
      title="MethodologyWorkspaceTemplate"
      description={`components/workspace/MethodologyWorkspaceTemplate – <MethodologyWorkspaceTemplate workspaceId="${workspaceId}" /> is the whole page. Tabs: Overview (T-18), Actions (default), Artifacts & Evidence (RepositoryPanel compact, filtered to the capability – T-19), SME Tasks & Issues (placeholder – T-20). On real pages the open tab is kept in the URL (?tab=…); turned off here.`}
    >
      <DemoRow label="Workspace" align="stretch">
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

      <Text textStyle="caption">Last event: {lastEvent || "–"}</Text>

      <MethodologyWorkspaceTemplate
        workspaceId={workspaceId}
        menuItems={menuItems}
        syncTabWithUrl={false}
        onRepositoryAction={(repo, actionId) => setLastEvent(`${repo} panel button "${actionId}"`)}
      />
    </DemoSection>
  );
};

export default MethodologyWorkspaceTemplateDemo;
