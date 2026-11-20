// SummaryStatsRow (T-16).
// SectionCard + StatGrid for the bottom of a workspace: Evidence Summary /
// Validation Summary / Assessment Snapshot / Workspace Summary / Transformation Snapshot.
// Title, labels, icons and formats come from config/workspaces.js; values from the service.
//
// Props:
//   workspaceId : workspace key, e.g. "legacyDiscovery"
//   values      : { [statId]: value } – workspace.service getWorkspace().summary
//   isLoading   : skeletons instead of the values
//   ...rest     : props for the SectionCard (e.g. border="none" boxShadow="none"
//                 when it sits inside another card)
//
// Example:
//   <SummaryStatsRow workspaceId="legacyDiscovery" values={workspace.summary} />

import React from "react";
import { Skeleton } from "@chakra-ui/react";
import SectionCard from "../common/SectionCard";
import { StatGrid } from "../common/StatCard";
import { getWorkspaceConfig } from "../../config/workspaces";

// 1248 → "1,248" · 64 → "64%" · 412 → "$412" (currency, US dollars) · "Fair" → "Fair" · missing → "—"
export const formatStatValue = (value, format) => {
  if (value === null || value === undefined || value === "") return "—";
  if (format === "percent") return `${value}%`;
  if (format === "currency" && typeof value === "number") return `$${value.toLocaleString("en-US")}`;
  if (format === "number" && typeof value === "number") return value.toLocaleString("en-US");
  return String(value);
};

const SummaryStatsRow = ({ workspaceId, values = {}, isLoading = false, ...rest }) => {
  const config = getWorkspaceConfig(workspaceId);
  if (!config || !config.summary) return null;

  const stats = config.summary.stats.map((stat) => ({
    icon: stat.icon,
    label: stat.label,
    tone: stat.tone,
    value: isLoading ? (
      <Skeleton as="span" display="block" h="24px" w="56px" mt={1} borderRadius="sm" startColor="neutral.100" endColor="neutral.200" />
    ) : (
      formatStatValue(values[stat.id], stat.format)
    ),
  }));

  return (
    <SectionCard title={config.summary.title} showDivider={false} bodyPadding="cardPadding" bodyProps={{ pt: 0 }} {...rest}>
      <StatGrid stats={stats} />
    </SectionCard>
  );
};

export default SummaryStatsRow;
