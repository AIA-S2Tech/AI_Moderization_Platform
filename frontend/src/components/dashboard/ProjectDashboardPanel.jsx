// ProjectDashboardPanel (T-25).
// Left section of the dashboard: "PROJECT DASHBOARD" + "Last Updated" timestamp,
// the Capability Progress table and the Key Metrics.
//
// Props:
//   workspaces  : workspace.service getWorkspaces() result (Capability Progress)
//   metrics     : { [metricId]: value } – dashboard.service keyMetrics
//   lastUpdated : UTC timestamp, e.g. "2026-05-21T13:30:00" → "May 21, 2026 9:30 AM" (US Eastern)
//   isLoading   : skeletons instead of the data
//   ...rest     : props for the SectionCard
//
// Example:
//   <ProjectDashboardPanel workspaces={workspaces} metrics={summary.keyMetrics}
//     lastUpdated={summary.lastUpdated} />

import React from "react";
import { Skeleton, Text } from "@chakra-ui/react";
import SectionCard from "../common/SectionCard";
import CapabilityProgressTable from "./CapabilityProgressTable";
import KeyMetricsGrid from "./KeyMetricsGrid";
import { formatDateTime } from "../../utils/date";

const ProjectDashboardPanel = ({ workspaces, metrics, lastUpdated, isLoading = false, ...rest }) => (
  <SectionCard
    title="Project Dashboard"
    subtitle={
      isLoading ? (
        <Skeleton as="span" display="inline-block" h="14px" w="180px" borderRadius="sm" startColor="neutral.100" endColor="neutral.200" />
      ) : (
        `Last Updated: ${formatDateTime(lastUpdated)}`
      )
    }
    showDivider={false}
    bodyProps={{ pt: 0 }}
    {...rest}
  >
    <CapabilityProgressTable workspaces={workspaces} isLoading={isLoading} />

    <Text as="h3" mt={6} mb={3} fontSize="md" fontWeight="bold" color="text.primary">
      Key Metrics
    </Text>
    <KeyMetricsGrid values={metrics} isLoading={isLoading} />
  </SectionCard>
);

export default ProjectDashboardPanel;
