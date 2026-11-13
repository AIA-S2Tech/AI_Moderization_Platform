// Shared DataTable (T-08, T-09, T-10).
// One table for every list in the app: repository tables, Recent Artifacts,
// Capability Progress, workspace Artifacts/Evidence tabs.
//
// ── Columns & cells (T-08) ─────────────────────────────────────────────
//   columns : [{
//     key       : field name in the row (also the column id)
//     header    : header text (string or node)
//     width     : optional, e.g. "120px" or "20%"
//     align     : left | center | right (default left)
//     render    : optional (row, rowIndex) => node – custom cell, e.g. a StatusBadge
//     sortable  : optional true – lets the user sort by this column (T-10)
//     sortValue : optional (row) => value used for sorting (default row[key])
//   }]
//   data        : array of row objects
//   rowKey      : field name or (row) => id that uniquely identifies a row (default "id")
//   onRowClick  : optional (row) => void – whole row becomes clickable (mouse + Enter key)
//   stickyHeader: keep the header visible while scrolling (default true).
//                 Needs `maxHeight`, because the table scrolls inside its own box.
//   maxHeight   : optional height after which the table body scrolls, e.g. "400px"
//
// ── Selection & row actions (T-09) ─────────────────────────────────────
//   selectable        : show a checkbox per row + a select-all checkbox
//   selectedKeys      : array of selected row keys  ─┐ controlled – pass both
//   onSelectionChange : (keys) => void               ─┘ (also called when uncontrolled)
//                       Select-all only affects the rows currently shown (current page).
//   rowActions        : optional (row) => node – last column, e.g. <RowActionMenu … />
//                       Clicks inside it never trigger onRowClick.
//
// ── Loading, empty, responsive, sort (T-10) ────────────────────────────
//   isLoading   : show skeleton rows instead of data
//   loadingRows : number of skeleton rows (default 5)
//   emptyState  : node shown when there are no rows – plug in Durga's <EmptyState /> here
//   defaultSort : { key, direction: "asc" | "desc" } – initial sort
//   manualSort  : true → the table doesn't sort `data` itself, it only calls
//                 onSortChange – use this when the API sorts (server-side)
//   onSortChange: ({ key, direction }) => void
//   minWidth    : table width below which it scrolls sideways (default "640px")
//   size        : sm | md – row height (sm for compact panels; default md)
//   isOutlined  : border + rounded corners around the table (default false –
//                 inside a SectionCard the card already gives the border)
//   ariaLabel   : accessible name for the table, e.g. "Evidence items"
//
// Example:
//   const columns = [
//     { key: "name", header: "Name", sortable: true },
//     { key: "type", header: "Type" },
//     { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
//   ];
//   <DataTable
//     columns={columns}
//     data={items}
//     selectable
//     rowActions={(row) => <RowActionMenu row={row} />}
//     emptyState={<EmptyState title="No evidence yet" />}
//     onRowClick={(row) => openItem(row)}
//   />

import React, { useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  Flex,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const sizeStyles = {
  sm: { py: 2, px: 3, fontSize: "xs" },
  md: { py: 3, px: 4, fontSize: "sm" },
};

const getKey = (row, rowKey, index) => {
  if (typeof rowKey === "function") return rowKey(row, index);
  const key = row && row[rowKey];
  return key !== undefined && key !== null ? key : index;
};

// Sorts numbers numerically, Dates by time, everything else as text
// ("File 2" before "File 10"). Empty values always go last.
const compareValues = (a, b) => {
  const aEmpty = a === undefined || a === null || a === "";
  const bEmpty = b === undefined || b === null || b === "";
  if (aEmpty && bEmpty) return 0;
  if (aEmpty) return 1;
  if (bEmpty) return -1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
};

// Stops clicks inside checkbox / action cells from also triggering onRowClick.
const stop = (e) => e.stopPropagation();

const DataTable = ({
  columns = [],
  data = [],
  rowKey = "id",
  onRowClick,
  stickyHeader = true,
  maxHeight,
  selectable = false,
  selectedKeys,
  onSelectionChange,
  rowActions,
  isLoading = false,
  loadingRows = 5,
  emptyState,
  defaultSort,
  manualSort = false,
  onSortChange,
  minWidth = "640px",
  size = "md",
  isOutlined = false,
  ariaLabel,
  ...rest
}) => {
  const s = sizeStyles[size] || sizeStyles.md;
  const rows = useMemo(() => data || [], [data]);

  // ── Sorting ──────────────────────────────────────────────
  const [sort, setSort] = useState(defaultSort || null);

  const sortedRows = useMemo(() => {
    if (!sort || manualSort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return rows;
    const valueOf = column.sortValue || ((row) => row[column.key]);
    const factor = sort.direction === "desc" ? -1 : 1;
    // copy before sorting – never mutate the caller's data
    return [...rows].sort((a, b) => factor * compareValues(valueOf(a), valueOf(b)));
  }, [rows, sort, manualSort, columns]);

  const handleSort = (key) => {
    // asc → desc → asc …
    const direction = sort && sort.key === key && sort.direction === "asc" ? "desc" : "asc";
    const next = { key, direction };
    setSort(next);
    if (onSortChange) onSortChange(next);
  };

  // ── Selection ────────────────────────────────────────────
  const [internalSelected, setInternalSelected] = useState([]);
  const isSelectionControlled = selectedKeys !== undefined;
  const selected = isSelectionControlled ? selectedKeys : internalSelected;
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const updateSelection = (keys) => {
    if (!isSelectionControlled) setInternalSelected(keys);
    if (onSelectionChange) onSelectionChange(keys);
  };

  const visibleKeys = sortedRows.map((row, i) => getKey(row, rowKey, i));
  const selectedVisibleCount = visibleKeys.filter((k) => selectedSet.has(k)).length;
  const allVisibleSelected = visibleKeys.length > 0 && selectedVisibleCount === visibleKeys.length;
  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;

  const toggleRow = (key) => {
    updateSelection(
      selectedSet.has(key) ? selected.filter((k) => k !== key) : [...selected, key]
    );
  };

  const toggleAll = () => {
    if (allVisibleSelected) {
      const visible = new Set(visibleKeys);
      updateSelection(selected.filter((k) => !visible.has(k)));
    } else {
      updateSelection([...selected, ...visibleKeys.filter((k) => !selectedSet.has(k))]);
    }
  };

  // ── Layout helpers ───────────────────────────────────────
  const hasActions = typeof rowActions === "function";
  const totalColumns = columns.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0);
  const isEmpty = !isLoading && sortedRows.length === 0;

  const cellPadding = { px: s.px, py: s.py };
  const headerCellStyle = {
    ...cellPadding,
    bg: "bg.subtle",
    color: "text.primary",
    fontSize: s.fontSize,
    fontWeight: "semibold",
    textTransform: "none",
    letterSpacing: "normal",
    whiteSpace: "nowrap",
    borderBottom: "1px solid",
    borderColor: "border.default",
    position: stickyHeader ? "sticky" : undefined,
    top: stickyHeader ? 0 : undefined,
    zIndex: stickyHeader ? 1 : undefined,
  };
  const bodyCellStyle = {
    ...cellPadding,
    fontSize: s.fontSize,
    color: "text.primary",
    borderBottom: "1px solid",
    borderColor: "border.default",
    verticalAlign: "middle",
  };

  const ariaSort = (key) => {
    if (!sort || sort.key !== key) return "none";
    return sort.direction === "asc" ? "ascending" : "descending";
  };

  return (
    <Box
      overflowX="auto"
      overflowY={maxHeight ? "auto" : undefined}
      maxH={maxHeight}
      border={isOutlined ? "1px solid" : undefined}
      borderColor="border.default"
      borderRadius={isOutlined ? "lg" : undefined}
      bg="bg.surface"
      {...rest}
    >
      <Table variant="unstyled" minW={minWidth} aria-label={ariaLabel} aria-busy={isLoading || undefined}>
        <Thead>
          <Tr>
            {selectable && (
              <Th {...headerCellStyle} w="48px" pr={0}>
                <Checkbox
                  colorScheme="navy"
                  isChecked={allVisibleSelected}
                  isIndeterminate={someVisibleSelected}
                  isDisabled={isLoading || visibleKeys.length === 0}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                />
              </Th>
            )}

            {columns.map((col) => (
              <Th
                key={col.key}
                {...headerCellStyle}
                w={col.width}
                textAlign={col.align || "left"}
                aria-sort={col.sortable ? ariaSort(col.key) : undefined}
              >
                {col.sortable ? (
                  <Flex
                    as="button"
                    type="button"
                    onClick={() => handleSort(col.key)}
                    align="center"
                    gap={1}
                    fontSize="inherit"
                    fontWeight="inherit"
                    fontFamily="inherit"
                    color="inherit"
                    justify={col.align === "right" ? "flex-end" : col.align === "center" ? "center" : "flex-start"}
                    w="100%"
                    borderRadius="sm"
                    _hover={{ color: "text.link" }}
                    _focusVisible={{ boxShadow: "focus", outline: "none" }}
                  >
                    {col.header}
                    <Box as="span" display="inline-flex" fontSize="2xs" aria-hidden="true">
                      {sort && sort.key === col.key ? (
                        sort.direction === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />
                      ) : (
                        <TriangleDownIcon opacity={0.3} />
                      )}
                    </Box>
                  </Flex>
                ) : (
                  col.header
                )}
              </Th>
            ))}

            {hasActions && (
              <Th {...headerCellStyle} w="56px" textAlign="center">
                <Box as="span" aria-hidden="true">···</Box>
                <Box as="span" srOnly>Actions</Box>
              </Th>
            )}
          </Tr>
        </Thead>

        <Tbody>
          {/* Loading skeleton */}
          {isLoading &&
            Array.from({ length: loadingRows }).map((_, i) => (
              <Tr key={`skeleton-${i}`}>
                {Array.from({ length: totalColumns }).map((__, j) => (
                  <Td key={j} {...bodyCellStyle}>
                    <Skeleton
                      h="14px"
                      w={j === 0 && selectable ? "16px" : "80%"}
                      borderRadius="sm"
                      startColor="neutral.100"
                      endColor="neutral.200"
                    />
                  </Td>
                ))}
              </Tr>
            ))}

          {/* Empty state */}
          {isEmpty && (
            <Tr>
              <Td colSpan={totalColumns} {...bodyCellStyle} borderBottom="none" py={10}>
                {emptyState || (
                  <Text textAlign="center" color="text.muted">
                    No data to show
                  </Text>
                )}
              </Td>
            </Tr>
          )}

          {/* Rows */}
          {!isLoading &&
            sortedRows.map((row, rowIndex) => {
              const key = visibleKeys[rowIndex];
              const isSelected = selectable && selectedSet.has(key);
              const clickable = typeof onRowClick === "function";

              return (
                <Tr
                  key={key}
                  bg={isSelected ? "bg.navTint" : undefined}
                  _hover={{ bg: isSelected ? "bg.navTint" : "bg.subtle" }}
                  transition="background-color 0.1s ease"
                  cursor={clickable ? "pointer" : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onClick={clickable ? () => onRowClick(row) : undefined}
                  onKeyDown={
                    clickable
                      ? (e) => {
                          if (e.key === "Enter" && e.target === e.currentTarget) onRowClick(row);
                        }
                      : undefined
                  }
                  _focusVisible={{ outline: "none", boxShadow: "inset 0 0 0 2px var(--chakra-colors-navy-500)" }}
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <Td {...bodyCellStyle} pr={0} onClick={stop}>
                      <Checkbox
                        colorScheme="navy"
                        isChecked={isSelected}
                        onChange={() => toggleRow(key)}
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </Td>
                  )}

                  {columns.map((col) => (
                    <Td key={col.key} {...bodyCellStyle} textAlign={col.align || "left"}>
                      {col.render ? col.render(row, rowIndex) : row[col.key]}
                    </Td>
                  ))}

                  {hasActions && (
                    <Td {...bodyCellStyle} textAlign="center" py={1} onClick={stop} onKeyDown={stop}>
                      {rowActions(row)}
                    </Td>
                  )}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DataTable;
