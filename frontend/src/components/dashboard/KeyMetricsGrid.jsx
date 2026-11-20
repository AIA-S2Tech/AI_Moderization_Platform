// KeyMetricsGrid (T-25).
// The 9 dashboard Key Metrics as StatCards: Evidence Coverage, Artifacts Generated,
// Artifacts Validated, Open SME Questions, Unresolved Assumptions, Conflicting
// Evidence, Human Review Hours, AI Processing (Est. Cost), Rework.
// Labels / icons / formats come from config/dashboardMetrics.js; values from
// dashboard.service getDashboardSummary().keyMetrics.
//
// Tiles wrap to fit the column they sit in (no fixed number per row), so the grid
// works in the dashboard's left column and full width on small screens.
//
// Props:
//   values    : { [metricId]: value }, e.g. { evidenceCoverage: 78, aiProcessingCost: 412 }
//   isLoading : skeletons instead of the values
//   ...rest   : props for the grid
//
// Example:
//   <KeyMetricsGrid values={summary.keyMetrics} />

import React from "react";
import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { StatCard } from "../common/StatCard";
import { formatStatValue } from "../workspace/SummaryStatsRow";
import { KEY_METRICS } from "../../config/dashboardMetrics";

const KeyMetricsGrid = ({ values = {}, isLoading = false, ...rest }) => (
  // 170px: the longest label ("Unresolved Assumptions") still breaks between words.
  <SimpleGrid minChildWidth="170px" spacing={3} {...rest}>
    {KEY_METRICS.map((metric) => (
      <StatCard
        key={metric.id}
        icon={metric.icon}
        label={metric.label}
        tone={metric.tone}
        value={
          isLoading ? (
            <Skeleton as="span" display="inline-block" h="20px" w="48px" borderRadius="sm" startColor="neutral.100" endColor="neutral.200" />
          ) : (
            formatStatValue(values[metric.id], metric.format)
          )
        }
      />
    ))}
  </SimpleGrid>
);

export default KeyMetricsGrid;
