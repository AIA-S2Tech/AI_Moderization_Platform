// WorkspaceOverviewTab (T-18).
// Overview tab of a methodology workspace: capability description, Progress %,
// Validation %, Open Issues, and the Artifact Lifecycle (FlowStepper).
// Text comes from config/workspaces.js, numbers from workspace.service.
//
// Props:
//   workspaceId : workspace key, e.g. "legacyDiscovery"
//   workspace   : getWorkspace() result – { percentComplete, validationPercent, openIssues }
//   isLoading   : skeletons instead of the numbers
//   ...rest     : props for the outer box
//
// Example:
//   <WorkspaceOverviewTab workspaceId="legacyDiscovery" workspace={data} isLoading={isLoading} />

import React from "react";
import { Box, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import { FiAlertCircle, FiCheckCircle, FiTrendingUp } from "react-icons/fi";
import SectionCard from "../common/SectionCard";
import FlowStepper from "../common/FlowStepper";
import { StatCard } from "../common/StatCard";
import { ARTIFACT_LIFECYCLE, getWorkspaceConfig } from "../../config/workspaces";
import { formatStatValue } from "./SummaryStatsRow";

const titleColor = { navy: "navy.800", red: "red.500" };

const WorkspaceOverviewTab = ({ workspaceId, workspace, isLoading = false, ...rest }) => {
  const config = getWorkspaceConfig(workspaceId);
  if (!config) return null;

  const data = workspace || {};
  const valueOf = (value, format) =>
    isLoading ? (
      <Skeleton as="span" display="block" h="24px" w="56px" mt={1} borderRadius="sm" startColor="neutral.100" endColor="neutral.200" />
    ) : (
      formatStatValue(value, format)
    );

  const stats = [
    { icon: FiTrendingUp, label: "Progress", value: valueOf(data.percentComplete, "percent") },
    { icon: FiCheckCircle, label: "Validation", value: valueOf(data.validationPercent, "percent") },
    {
      icon: FiAlertCircle,
      label: "Open Issues",
      value: valueOf(data.openIssues, "number"),
      tone: data.openIssues > 0 ? "red" : "default",
    },
  ];

  return (
    <Box {...rest}>
      <Text
        as="h3"
        fontSize="sm"
        fontWeight="bold"
        letterSpacing="wider"
        textTransform="uppercase"
        color={titleColor[config.theme] || titleColor.navy}
        mb={2}
      >
        About this capability
      </Text>
      <Text fontSize="md" color="text.primary" mb={6}>
        {config.subtitle}
      </Text>

      {/* 3 cards → own grid (StatGrid is fixed at 4 columns) */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </SimpleGrid>

      <SectionCard
        mt={6}
        title={
          <>
            Artifact Lifecycle{" "}
            <Text as="span" fontWeight="normal" textTransform="none" letterSpacing="normal" color="text.secondary">
              (applies across all capabilities)
            </Text>
          </>
        }
        showDivider={false}
        bodyProps={{ pt: 0 }}
      >
        <FlowStepper steps={ARTIFACT_LIFECYCLE} />
      </SectionCard>
    </Box>
  );
};

export default WorkspaceOverviewTab;
