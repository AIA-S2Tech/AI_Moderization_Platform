// UI Kit demo – DataTable (T-08, T-09, T-10).
// Sample rows copy the Evidence Repository and Recent Artifacts mockups.

import React, { useState } from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FiFileText, FiMoreVertical } from "react-icons/fi";
import DataTable from "../../../../components/common/DataTable";
import StatusBadge from "../../../../components/common/StatusBadge";
import Button from "../../../../components/common/Button";
import { DemoSection, DemoRow } from "../DemoSection";

// ── Sample data (demo only – real pages get data from services/) ──
const evidenceRows = [
  { id: 1, name: "MMIS_COBOL_Source.zip", type: "Source Code", source: "Client", dateAdded: "2024-10-14", status: "Validated" },
  { id: 2, name: "JCL_Procedures.pdf", type: "Document", source: "Client", dateAdded: "2024-10-14", status: "Validated" },
  { id: 3, name: "System Architecture.docx", type: "Architecture", source: "Client", dateAdded: "2024-10-12", status: "Validated" },
  { id: 4, name: "Business Requirements.docx", type: "Requirements", source: "Client", dateAdded: "2024-10-10", status: "Validated" },
  { id: 5, name: "Data Model ERD.vsdx", type: "Data Model", source: "Client", dateAdded: "2024-10-10", status: "Validated" },
  { id: 6, name: "Operations Manual.pdf", type: "Procedure", source: "Client", dateAdded: "2024-10-08", status: "Validated" },
  { id: 7, name: "Interface Control Doc.pdf", type: "Interface", source: "Client", dateAdded: "2024-10-08", status: "Validated" },
  { id: 8, name: "Test Cases.xlsx", type: "Test", source: "Client", dateAdded: "2024-10-06", status: "Validated" },
  { id: 9, name: "Policy Guidelines.pdf", type: "Policy", source: "Client", dateAdded: "2024-10-05", status: "Validated" },
  { id: 10, name: "Meeting Notes - SMEs.docx", type: "Meeting Notes", source: "S2Tech", dateAdded: "2024-10-04", status: "In Review" },
];

const artifactRows = [
  { id: "a1", artifact: "System Overview", type: "Document", version: "1.2", status: "Certified", updated: "2026-05-20" },
  { id: "a2", artifact: "Application Inventory", type: "Document", version: "1.1", status: "Certified", updated: "2026-05-19" },
  { id: "a3", artifact: "Process Flow (Level 1)", type: "Diagram", version: "1.0", status: "Certified", updated: "2026-05-18" },
  { id: "a4", artifact: "Dependency Analysis", type: "Document", version: "1.0", status: "Certified", updated: "2026-05-18" },
  { id: "a5", artifact: "Interface Inventory", type: "Document", version: "1.1", status: "Certified", updated: "2026-05-19" },
  { id: "a6", artifact: "Evidence Gap Report", type: "Document", version: "1.0", status: "Certified", updated: "2026-05-17" },
];

// "2024-10-14" → "10/14/2024" (mockup format). ISO strings also sort correctly as text.
const toUsDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
};
const toLongDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ── Columns ──
const evidenceColumns = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    // FileTypeIcon (Durga, T-48) replaces this generic icon once merged.
    render: (row) => (
      <Flex align="center" gap={2}>
        <Box as={FiFileText} color="text.muted" flexShrink={0} />
        <Text as="span">{row.name}</Text>
      </Flex>
    ),
  },
  { key: "type", header: "Type", sortable: true },
  { key: "source", header: "Source", sortable: true },
  { key: "dateAdded", header: "Date Added", sortable: true, render: (row) => toUsDate(row.dateAdded) },
  { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} size="sm" /> },
];

const artifactColumns = [
  {
    key: "artifact",
    header: "Artifact",
    render: (row) => (
      <Link color="text.link" fontWeight="medium">
        {row.artifact}
      </Link>
    ),
  },
  { key: "type", header: "Type" },
  { key: "version", header: "Version", align: "center" },
  { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} size="sm" /> },
  { key: "updated", header: "Updated", render: (row) => toLongDate(row.updated) },
];

// Placeholder for Durga's RowActionMenu (T-49) until it is merged.
// Clicking it only reports which row was clicked (shown in the demo label).
const KebabPlaceholder = ({ row, onAction }) => (
  <Button
    variant="ghost"
    size="sm"
    icon={<FiMoreVertical />}
    aria-label={`Actions for ${row.name || row.artifact}`}
    onClick={() => onAction && onAction(row.name || row.artifact)}
  />
);

const DataTableDemo = () => {
  const [clicked, setClicked] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortInfo, setSortInfo] = useState(null);
  const [actionRow, setActionRow] = useState(null);

  return (
    <DemoSection
      id="data-table"
      title="DataTable"
      description="components/common/DataTable.jsx – columns & custom cells (T-08), selection & row actions (T-09), loading / empty / sort / horizontal scroll (T-10)."
    >
      <DemoRow
        label={`Recent Artifacts style – outlined, row click${clicked ? ` → clicked "${clicked}"` : ""}`}
        align="stretch"
      >
        <DataTable
          w="100%"
          isOutlined
          ariaLabel="Recent artifacts"
          columns={artifactColumns}
          data={artifactRows}
          onRowClick={(row) => setClicked(row.artifact)}
        />
      </DemoRow>

      <DemoRow
        label={`Repository style – sort, select-all, row actions · selected: ${selectedKeys.length}${
          sortInfo ? ` · sorted by ${sortInfo.key} (${sortInfo.direction})` : ""
        }${actionRow ? ` · ⋮ clicked on "${actionRow}"` : ""}`}
        align="stretch"
      >
        <DataTable
          w="100%"
          isOutlined
          ariaLabel="Evidence items"
          columns={evidenceColumns}
          data={evidenceRows}
          selectable
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          rowActions={(row) => <KebabPlaceholder row={row} onAction={setActionRow} />}
          defaultSort={{ key: "dateAdded", direction: "desc" }}
          onSortChange={setSortInfo}
        />
      </DemoRow>

      <DemoRow label="Loading skeleton" align="stretch">
        <Box w="100%">
          <Button size="sm" variant="outline" mb={3} onClick={() => setIsLoading((v) => !v)}>
            {isLoading ? "Show data" : "Show loading"}
          </Button>
          <DataTable
            isOutlined
            columns={artifactColumns}
            data={artifactRows}
            isLoading={isLoading}
            selectable
            rowActions={(row) => <KebabPlaceholder row={row} onAction={setActionRow} />}
          />
        </Box>
      </DemoRow>

      <DemoRow label="Empty – default and custom empty state" align="stretch">
        <Flex direction="column" gap={4} w="100%">
          <DataTable isOutlined columns={artifactColumns} data={[]} />
          <DataTable
            isOutlined
            columns={artifactColumns}
            data={[]}
            // Durga's <EmptyState /> (T-52) goes here once merged.
            emptyState={
              <Flex direction="column" align="center" gap={2} color="text.muted">
                <Box as={FiFileText} boxSize="40px" />
                <Text fontWeight="semibold" color="text.primary">No artifacts yet</Text>
                <Text fontSize="sm">Start by running an approved action.</Text>
              </Flex>
            }
          />
        </Flex>
      </DemoRow>

      <DemoRow label="Compact (size sm) + sticky header – scroll inside the table" align="stretch">
        <DataTable
          w="100%"
          isOutlined
          size="sm"
          maxHeight="220px"
          columns={evidenceColumns}
          data={evidenceRows}
        />
      </DemoRow>

      <DemoRow label="Horizontal scroll – resize the window below 640px to see it" align="stretch">
        <DataTable w="100%" isOutlined minWidth="900px" columns={evidenceColumns} data={evidenceRows.slice(0, 3)} />
      </DemoRow>
    </DemoSection>
  );
};

export default DataTableDemo;
