// RecentArtifactsTable (T-16).
// "RECENT ARTIFACTS" title + DataTable (Artifact, Type, Version, Status, Updated),
// with EmptyState "No artifacts yet" when the workspace has none.
//
// Props:
//   artifacts       : [{ id, name, type, version, status, updated }] – from workspace.service
//   isLoading       : skeleton rows
//   title           : section title (default "Recent Artifacts")
//   onArtifactClick : optional (artifact) => void – makes the names (and rows) clickable
//   ...rest         : props for the outer box
//
// Example:
//   <RecentArtifactsTable artifacts={workspace.recentArtifacts} isLoading={isLoading} />

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FiFileText } from "react-icons/fi";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";
import { formatDateMedium } from "../../utils/date";

const RecentArtifactsTable = ({
  artifacts = [],
  isLoading = false,
  title = "Recent Artifacts",
  onArtifactClick,
  ...rest
}) => {
  const columns = [
    {
      key: "name",
      header: "Artifact",
      render: (row) => (
        <Text as="span" color="text.link" fontWeight="medium">
          {row.name}
        </Text>
      ),
    },
    { key: "type", header: "Type" },
    { key: "version", header: "Version" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} size="sm" /> },
    { key: "updated", header: "Updated", render: (row) => formatDateMedium(row.updated) },
  ];

  return (
    <Box minW={0} {...rest}>
      <Text as="h3" fontSize="sm" fontWeight="bold" letterSpacing="wider" textTransform="uppercase" color="navy.800" mb={3}>
        {title}
      </Text>
      <DataTable
        columns={columns}
        data={artifacts}
        isLoading={isLoading}
        loadingRows={4}
        isOutlined
        minWidth="560px"
        onRowClick={onArtifactClick}
        ariaLabel={title}
        emptyState={
          <EmptyState icon={FiFileText} title="No artifacts yet" message="Start by running an approved action." />
        }
      />
    </Box>
  );
};

export default RecentArtifactsTable;
