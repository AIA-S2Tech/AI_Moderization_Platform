// CapabilityProgressTable (T-25).
// Dashboard table of the 5 capabilities: #, Capability, Progress, Validation,
// Open Issues, Status. Built on the shared DataTable – no table code of its own.
// Names and numbers (step 1–5) come from config/workspaces.js; the live values from
// workspace.service getWorkspaces().
//
// Props:
//   workspaces : workspace.service getWorkspaces() result
//                [{ id, status, percentComplete, validationPercent, openIssues }]
//   isLoading  : skeleton rows instead of the data
//   ...rest    : props for the DataTable wrapper
//
// Example:
//   <CapabilityProgressTable workspaces={workspaces} isLoading={!workspaces} />

import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import { formatStatValue } from "../workspace/SummaryStatsRow";
import { WORKSPACE_LIST } from "../../config/workspaces";

// Small numbered square in front of the capability name.
const StepNumber = ({ value }) => (
  <Flex
    aria-hidden="true"
    flexShrink={0}
    align="center"
    justify="center"
    boxSize="24px"
    borderRadius="md"
    border="1px solid"
    borderColor="border.navy"
    color="navy.800"
    fontSize="xs"
    fontWeight="bold"
  >
    {value}
  </Flex>
);

// A capability that has not started shows "—" for its progress, as in the mockup.
const formatProgress = (row) =>
  row.status === "Not Started" ? "—" : formatStatValue(row.percentComplete, "percent");

const columns = [
  {
    key: "title",
    header: "Capability Progress",
    render: (row) => (
      <Flex align="center" gap={3} minW={0}>
        <StepNumber value={row.number} />
        <Text as="span" color="text.primary" fontWeight="medium">
          {row.title}
        </Text>
      </Flex>
    ),
  },
  { key: "percentComplete", header: "Progress", align: "center", render: formatProgress },
  {
    key: "validationPercent",
    header: "Validation",
    align: "center",
    render: (row) => formatStatValue(row.validationPercent, "percent"),
  },
  {
    key: "openIssues",
    header: "Open Issues",
    align: "center",
    render: (row) => formatStatValue(row.openIssues, "number"),
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => (row.status ? <StatusBadge status={row.status} size="sm" /> : "—"),
  },
];

const CapabilityProgressTable = ({ workspaces = [], isLoading = false, ...rest }) => {
  // Methodology order and names from config; values from the service.
  const byId = Object.fromEntries(workspaces.map((ws) => [ws.id, ws]));
  const rows = WORKSPACE_LIST.map((config) => ({
    ...(byId[config.id] || {}),
    id: config.id,
    number: config.number,
    title: config.title,
  }));

  return (
    <DataTable
      columns={columns}
      data={rows}
      isLoading={isLoading}
      loadingRows={WORKSPACE_LIST.length}
      size="sm"
      isOutlined
      minWidth="520px"
      ariaLabel="Capability progress"
      {...rest}
    />
  );
};

export default CapabilityProgressTable;
