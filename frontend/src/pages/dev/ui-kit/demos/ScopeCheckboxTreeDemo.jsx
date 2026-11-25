// UI Kit demo – ScopeCheckboxTree (S2-06).
// Sample workspaces / deliverables (names from the Project Scope concept, screen 2).
// Real screens build `groups` from config/methodology.js.

import React, { useState } from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import ScopeCheckboxTree from "../../../../components/scope/ScopeCheckboxTree";
import { DemoSection, DemoRow } from "../DemoSection";

const GROUPS = [
  {
    id: "legacyDiscovery",
    label: "1. Legacy Discovery",
    items: [
      { id: "system-overview", label: "System Overview" },
      { id: "application-component-inventory", label: "Application / Component Inventory" },
      { id: "evidence-gap-analysis", label: "Evidence Gap Analysis" },
    ],
  },
  {
    id: "modernizationAssessment",
    label: "3. Modernization Assessment",
    items: [
      { id: "modernization-assessment", label: "Modernization Assessment" },
      { id: "modernization-prioritization-matrix", label: "Modernization Prioritization Matrix" },
      { id: "modernization-alternatives-recommended-path", label: "Modernization Alternatives & Recommended Path" },
    ],
  },
];

const ScopeCheckboxTreeDemo = () => {
  const [selected, setSelected] = useState([
    "system-overview",
    "application-component-inventory",
    "evidence-gap-analysis",
    "modernization-assessment",
    "modernization-alternatives-recommended-path",
  ]);

  return (
    <DemoSection
      id="scope-checkbox-tree"
      title="ScopeCheckboxTree"
      description="components/scope/ScopeCheckboxTree.jsx – workspace checkbox selects / clears all its deliverables; indeterminate when only some are selected. Tab + Space with the keyboard."
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        <DemoRow label="Interactive" direction="column" align="stretch">
          <ScopeCheckboxTree groups={GROUPS} value={selected} onChange={setSelected} />
          <Text textStyle="caption">Selected ({selected.length}): {selected.join(", ") || "none"}</Text>
        </DemoRow>

        <DemoRow label="Read-only (scope history) – same selection" direction="column" align="stretch">
          <ScopeCheckboxTree groups={GROUPS} value={selected} isReadOnly />
        </DemoRow>
      </SimpleGrid>
    </DemoSection>
  );
};

export default ScopeCheckboxTreeDemo;
