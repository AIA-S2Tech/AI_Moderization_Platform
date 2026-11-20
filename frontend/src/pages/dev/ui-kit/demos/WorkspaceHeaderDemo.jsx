// UI Kit demo – WorkspaceHeader (T-14).
// Statuses, loading state and the ⋮ menu. Props only – no workspace config needed.

import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import Card from "../../../../components/common/Card";
import WorkspaceHeader from "../../../../components/workspace/WorkspaceHeader";
import { DemoSection, DemoRow } from "../DemoSection";

const examples = [
  { title: "Legacy Discovery", status: "Certified", percentComplete: 100 },
  { title: "Business Rule Intelligence", status: "In Progress", percentComplete: 82 },
  { title: "Modernization Assessment", status: "Started", percentComplete: 15 },
  { title: "Targeted Modernization", status: "Not Started", percentComplete: 0 },
];

const WorkspaceHeaderDemo = () => {
  const [lastEvent, setLastEvent] = useState("");

  const menuItems = ["View Overview", "Export Summary", "Workspace Settings"].map((label) => ({
    label,
    onClick: () => setLastEvent(`⋮ "${label}"`),
  }));

  const box = { borderBottom: "1px solid", borderColor: "border.default" };

  return (
    <DemoSection
      id="workspace-header"
      title="WorkspaceHeader"
      description="components/workspace/WorkspaceHeader – ‹ Back to Workspace link, capability title, StatusBadge, '% Complete' and ⋮ menu (RowActionMenu). The ⋮ always shows, even without menuItems."
    >
      <DemoRow label="Statuses (with ⋮ menu)" align="stretch">
        <Card padding={0} w="100%">
          {examples.map((ex, i) => (
            <WorkspaceHeader
              key={ex.title}
              {...ex}
              menuItems={menuItems}
              {...(i < examples.length - 1 ? box : {})}
            />
          ))}
        </Card>
      </DemoRow>

      <Text textStyle="caption">Last event: {lastEvent || "–"}</Text>

      <DemoRow label="Loading" align="stretch">
        <Card padding={0} w="100%">
          <WorkspaceHeader title="Legacy Discovery" isLoading menuItems={menuItems} />
        </Card>
      </DemoRow>

      <DemoRow label="No menu items, custom back link" align="stretch">
        <Card padding={0} w="100%">
          <WorkspaceHeader
            title="AI-Assisted Code Transformation"
            status="Not Started"
            percentComplete={0}
            backLabel="Back to Methodology Workspaces"
          />
        </Card>
      </DemoRow>
    </DemoSection>
  );
};

export default WorkspaceHeaderDemo;
