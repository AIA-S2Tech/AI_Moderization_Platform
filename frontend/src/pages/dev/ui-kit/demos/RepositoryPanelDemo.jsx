// UI Kit demo – RepositoryPanel template (T-11) on repository config + mock service (T-12).

import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import RepositoryPanel from "../../../../components/repository/RepositoryPanel";
import { REPOSITORY_KEYS, getCapabilityLabel } from "../../../../config/repositories";
import { addRepositoryItem } from "../../../../services/repository.service";
import { todayDate } from "../../../../utils/date";
import { DemoSection, DemoRow } from "../DemoSection";

const LastEvent = ({ text }) => (
  <Text textStyle="caption" mt={2}>
    Last event: {text || "–"}
  </Text>
);

const RepositoryPanelDemo = () => {
  const [lastEvent, setLastEvent] = useState("");
  const [evidenceRefresh, setEvidenceRefresh] = useState(0);

  const log = (repo) => ({
    onAction: (actionId) => setLastEvent(`${repo}: header button "${actionId}"`),
    onRowAction: (actionId, row) => setLastEvent(`${repo}: ⋮ "${actionId}" on "${row.name}"`),
    onSelectionChange: (ids) => ids.length && setLastEvent(`${repo}: ${ids.length} row(s) selected`),
    onFilterClick: () => setLastEvent(`${repo}: filter button`),
  });

  // Upload Evidence demo: adds a sample item through the service, then reloads the panel
  // – the same flow the Upload modal (T-62) will use.
  const handleEvidenceAction = async () => {
    const item = await addRepositoryItem(REPOSITORY_KEYS.EVIDENCE, {
      name: `Sample Upload ${evidenceRefresh + 1}.pdf`,
      type: "Document",
      source: "S2Tech",
      dateAdded: todayDate(),
      status: "In Review",
      classification: "Internal",
      version: "v0.1",
      capability: "legacyDiscovery",
    });
    setEvidenceRefresh((n) => n + 1);
    setLastEvent(`evidence: added "${item.name}" via repository.service`);
  };

  const workspaceCapability = "legacyDiscovery";

  return (
    <DemoSection
      id="repository-panel"
      title="RepositoryPanel"
      description="components/repository/RepositoryPanel.jsx – driven by config/repositories.js, data from services/repository.service.js (mock). The 3 panels below differ only by config."
    >
      <LastEvent text={lastEvent} />

      <DemoRow label="Evidence – navy (‘+ Upload Evidence’ adds a sample row through the service)" align="stretch">
        <Box w="100%">
          <RepositoryPanel
            repository={REPOSITORY_KEYS.EVIDENCE}
            refreshKey={evidenceRefresh}
            {...log("evidence")}
            onAction={handleEvidenceAction}
          />
        </Box>
      </DemoRow>

      <DemoRow label="Working / Generated Artifacts – red" align="stretch">
        <Box w="100%">
          <RepositoryPanel repository={REPOSITORY_KEYS.ARTIFACTS} {...log("artifacts")} />
        </Box>
      </DemoRow>

      <DemoRow label="Certified Knowledge – navy" align="stretch">
        <Box w="100%">
          <RepositoryPanel repository={REPOSITORY_KEYS.CERTIFIED} {...log("certified")} />
        </Box>
      </DemoRow>

      <DemoRow
        label={`Compact + capability pre-filter (workspace Artifacts tab) – ${getCapabilityLabel(workspaceCapability)} only, no tabs, 5 per page, title links to the full page`}
        align="stretch"
      >
        <Box w="100%">
          <RepositoryPanel
            repository={REPOSITORY_KEYS.ARTIFACTS}
            capability={workspaceCapability}
            compact
            showTabs={false}
            linkTitle
            pageSize={5}
            {...log("artifacts (compact)")}
          />
        </Box>
      </DemoRow>
    </DemoSection>
  );
};

export default RepositoryPanelDemo;
