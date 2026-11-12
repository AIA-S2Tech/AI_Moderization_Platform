// UI Kit demo – Tabs (T-06).

import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Tabs from "../../../../components/common/Tabs";
import Card from "../../../../components/common/Card";
import { DemoSection, DemoRow } from "../DemoSection";

const Panel = ({ name }) => (
  <Text textStyle="body" color="text.secondary">
    {name} tab content
  </Text>
);

const workspaceTabs = [
  "Overview",
  "Actions",
  "Artifacts",
  "Evidence",
  "SME Tasks",
  "Issues",
].map((label) => ({
  id: label.toLowerCase().replace(/\s+/g, "-"),
  label,
  content: <Panel name={label} />,
}));

// Tabs used as a filter – no content, the page shows one table below.
const repositoryTabs = [
  { id: "all", label: "All Evidence" },
  { id: "type", label: "By Type" },
  { id: "source", label: "By Source" },
  { id: "date", label: "By Date" },
  { id: "metadata", label: "Metadata" },
];

const disabledTabs = [
  { id: "one", label: "Enabled", content: <Panel name="Enabled" /> },
  { id: "two", label: "Disabled", content: <Panel name="Disabled" />, isDisabled: true },
  { id: "three", label: "Enabled too", content: <Panel name="Enabled too" /> },
];

const TabsDemo = () => {
  const [redTab, setRedTab] = useState("actions");
  const [filterTab, setFilterTab] = useState("all");

  return (
    <DemoSection
      id="tabs"
      title="Tabs"
      description="components/common/Tabs.jsx – keyboard: Tab to focus, ← → to move, Home / End."
    >
      <DemoRow label="Uncontrolled, accent navy (defaultValue = actions)" align="stretch">
        <Card padding={0} overflow="hidden" w="100%">
          <Tabs tabs={workspaceTabs} defaultValue="actions" />
        </Card>
      </DemoRow>

      <DemoRow label={`Controlled, accent red – active: "${redTab}"`} align="stretch">
        <Card padding={0} overflow="hidden" w="100%">
          <Tabs tabs={workspaceTabs} accent="red" value={redTab} onChange={setRedTab} />
        </Card>
      </DemoRow>

      <DemoRow label="URL sync – watch ?tab= in the address bar (try a page refresh)" align="stretch">
        <Card padding={0} overflow="hidden" w="100%">
          <Tabs tabs={workspaceTabs} defaultValue="overview" syncWithUrl />
        </Card>
      </DemoRow>

      <DemoRow label={`Size md, tab bar only (repository filter) – selected: "${filterTab}"`} align="stretch">
        <Card padding={0} overflow="hidden" w="100%">
          <Tabs tabs={repositoryTabs} size="md" value={filterTab} onChange={setFilterTab} />
          <Box p="cardPadding">
            <Text textStyle="caption">The table below would filter by “{filterTab}”.</Text>
          </Box>
        </Card>
      </DemoRow>

      <DemoRow label="Disabled tab" align="stretch">
        <Card padding={0} overflow="hidden" w="100%">
          <Tabs tabs={disabledTabs} />
        </Card>
      </DemoRow>
    </DemoSection>
  );
};

export default TabsDemo;
