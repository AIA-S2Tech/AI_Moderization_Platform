// RepositoryPanel template (T-11).
// One panel for all 3 repositories: SectionCard header (title, subtitle, action
// button) + Tabs + TableToolbar (search & filters) + DataTable + Pagination.
// Everything that differs between repositories comes from config/repositories.js,
// and the data comes from services/repository.service.js – pages are config only.
//
// Props:
//   repository     : "evidence" | "artifacts" | "certified" (or a config object
//                    shaped like those in config/repositories.js)
//   capability     : optional workspace key, e.g. "legacyDiscovery" – shows only that
//                    capability's items and hides the (then pointless) capability
//                    column & filter. Used inside the workspace Artifacts/Evidence tabs.
//   compact        : denser table and smaller button – for the Repositories hub and
//                    the workspace tabs
//   showTabs       : show the tab bar (default true)
//   showHeader     : show the coloured header (default true)
//   linkTitle      : make the title a link to the full repository page (hub)
//   pageSize       : rows per page (default 10)
//   selectable     : row checkboxes (default true)
//   onAction       : (actionId) => void – header button, e.g. open the Upload modal
//   onRowAction    : (actionId, row) => void – a ⋮ menu item was picked
//   onRowClick     : optional (row) => void
//   onSelectionChange : optional (selectedIds) => void
//   onFilterClick  : optional () => void – the filter icon button next to the dropdowns
//   refreshKey     : change it (e.g. a counter) to reload the list after an add
//   ...rest        : props for the outer SectionCard (w, h, mt, etc.)
//
// Examples:
//   <RepositoryPanel repository="evidence" onAction={openUpload} />
//   <RepositoryPanel repository="artifacts" capability="legacyDiscovery" compact showTabs={false} />

import React, { useEffect, useMemo, useState } from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiAlertCircle, FiInbox, FiSearch } from "react-icons/fi";

import SectionCard from "../common/SectionCard";
import Tabs from "../common/Tabs";
import TableToolbar from "../common/TableToolbar";
import DataTable, { compareValues } from "../common/DataTable";
import Pagination from "../common/Pagination";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import FileTypeIcon from "../common/FileTypeIcon";
import RowActionMenu from "../common/RowActionMenu";
import EmptyState from "../common/EmptyState";
import { getRepositoryConfig, getCapabilityLabel } from "../../config/repositories";
import { getRepositoryItems } from "../../services/repository.service";
import { formatDate } from "../../utils/date";

// ── Cell renderers & values, by column type ─────────────────────────────

// Text shown for a cell – also what search and sort use, so "Business Rule
// Intelligence" sorts and matches by its label, not its key.
const displayValue = (column, row) => {
  const value = row[column.key];
  if (column.type === "capability") return getCapabilityLabel(value);
  return value == null ? "" : String(value);
};

const renderCell = (column, row) => {
  switch (column.type) {
    case "file":
      return (
        <Flex align="center" gap={2} minW={0}>
          <FileTypeIcon fileName={row.name} type={row.fileType} />
          <Text as="span" noOfLines={1} title={row.name}>
            {row.name}
          </Text>
        </Flex>
      );
    case "status":
      return <StatusBadge status={row[column.key]} size="sm" />;
    case "date":
      return formatDate(row[column.key]);
    default:
      return displayValue(column, row) || "—";
  }
};

// ISO dates sort correctly as text, so only the capability label needs a special value.
const sortValueOf = (column) => (row) =>
  column.type === "capability" ? getCapabilityLabel(row[column.key]) : row[column.key];

// Unique, sorted values of a field – used for filters that have no options in config.
const optionsFromData = (items, key) =>
  [...new Set(items.map((item) => item[key]).filter(Boolean))].sort((a, b) => compareValues(a, b));

const RepositoryPanel = ({
  repository,
  capability,
  compact = false,
  showTabs = true,
  showHeader = true,
  linkTitle = false,
  pageSize = 10,
  selectable = true,
  onAction,
  onRowAction,
  onRowClick,
  onSelectionChange,
  onFilterClick,
  refreshKey,
  ...rest
}) => {
  const config = typeof repository === "string" ? getRepositoryConfig(repository) : repository;
  const repositoryKey = config && config.key;

  // ── Data ────────────────────────────────────────────────────────────
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (!repositoryKey) return undefined;
    let isCurrent = true; // ignore a slow response that arrives after props changed
    setIsLoading(true);
    setError(null);
    getRepositoryItems(repositoryKey, { capability })
      .then((data) => isCurrent && setItems(data))
      .catch((err) => isCurrent && setError(err))
      .finally(() => isCurrent && setIsLoading(false));
    return () => {
      isCurrent = false;
    };
  }, [repositoryKey, capability, refreshKey, reloadCount]);

  // ── View state: tab, search / filters, sort, page, selection ───────
  const tabs = useMemo(() => (config && config.tabs) || [], [config]);
  const [tabId, setTabId] = useState(tabs[0] && tabs[0].id);
  const activeTab = useMemo(
    () => tabs.find((t) => t.id === tabId) || tabs[0] || {},
    [tabs, tabId]
  );
  const [sort, setSort] = useState(activeTab.sort || (config && config.defaultSort) || null);
  const [query, setQuery] = useState({ search: "", filters: {} });
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const updateSelection = (ids) => {
    setSelectedIds(ids);
    if (onSelectionChange) onSelectionChange(ids);
  };

  const handleTabChange = (id) => {
    const tab = tabs.find((t) => t.id === id) || {};
    setTabId(id);
    setSort(tab.sort || config.defaultSort || null);
    setPage(1);
  };

  const handleQueryChange = (next) => {
    setQuery(next);
    setPage(1);
  };

  // Another repository / capability → start from a clean search (the toolbar remounts too).
  useEffect(() => {
    setQuery({ search: "", filters: {} });
    setPage(1);
  }, [repositoryKey, capability]);

  // A different list is shown → the old selection no longer applies.
  useEffect(() => {
    setSelectedIds([]);
    if (onSelectionChange) onSelectionChange([]);
    // onSelectionChange is left out on purpose: a new function each render must not clear the selection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, query, tabId]);

  // ── Columns & filters for the current tab ──────────────────────────
  const hideCapability = Boolean(capability);

  const columns = useMemo(() => {
    if (!config) return [];
    const keys = activeTab.columns || config.defaultColumns || config.columns.map((c) => c.key);
    return keys
      .map((key) => config.columns.find((c) => c.key === key))
      .filter((c) => c && !(hideCapability && c.type === "capability"))
      .map((c) => ({
        key: c.key,
        header: c.header,
        width: c.width,
        align: c.align,
        sortable: c.sortable,
        sortValue: sortValueOf(c),
        render: (row) => renderCell(c, row),
      }));
  }, [config, activeTab, hideCapability]);

  const filters = useMemo(() => {
    if (!config) return [];
    return (config.filters || [])
      .filter((f) => !(hideCapability && f.key === "capability"))
      .map((f) => ({ ...f, options: f.options || optionsFromData(items, f.key) }));
  }, [config, items, hideCapability]);

  // ── Filter → sort → page (on the full list, so paging is correct) ──
  const filteredItems = useMemo(() => {
    if (!config) return [];
    const term = query.search.trim().toLowerCase();
    const searchColumns = (config.searchFields || ["name"]).map(
      (key) => config.columns.find((c) => c.key === key) || { key }
    );
    const activeFilters = Object.entries(query.filters).filter(([, value]) => value);

    return items.filter((item) => {
      const matchesFilters = activeFilters.every(([key, value]) => String(item[key]) === value);
      if (!matchesFilters) return false;
      if (!term) return true;
      return searchColumns.some((c) => displayValue(c, item).toLowerCase().includes(term));
    });
  }, [config, items, query]);

  const sortedItems = useMemo(() => {
    if (!sort || !config) return filteredItems;
    const column = config.columns.find((c) => c.key === sort.key);
    if (!column) return filteredItems;
    const valueOf = sortValueOf(column);
    const factor = sort.direction === "desc" ? -1 : 1;
    return [...filteredItems].sort((a, b) => factor * compareValues(valueOf(a), valueOf(b)));
  }, [config, filteredItems, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sortedItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (!config) {
    // A developer error (wrong repository key) – shown so it is noticed straight away.
    return (
      <Box p="cardPadding" border="1px dashed" borderColor="border.default" borderRadius="xl">
        <Text color="text.secondary">Unknown repository “{String(repository)}”.</Text>
      </Box>
    );
  }

  // ── Header ──────────────────────────────────────────────────────────
  const action = config.action;
  const ActionIcon = action && action.icon;
  const headerTitle = linkTitle ? (
    <Link
      as={RouterLink}
      to={config.path}
      color="inherit"
      _hover={{ textDecoration: "underline" }}
      _focusVisible={{ boxShadow: "focus", outline: "none" }}
    >
      {config.title}
    </Link>
  ) : (
    config.title
  );

  const headerAction = action ? (
    <Button
      variant="outline"
      size={compact ? "sm" : "md"}
      leftIcon={ActionIcon ? <ActionIcon /> : undefined}
      onClick={() => onAction && onAction(action.id)}
    >
      {action.label}
    </Button>
  ) : null;

  // ── Empty / error states ────────────────────────────────────────────
  const hasQuery = Boolean(query.search.trim()) || Object.values(query.filters).some(Boolean);
  let emptyState;
  if (error) {
    emptyState = (
      <EmptyState
        icon={FiAlertCircle}
        title="Couldn't load items"
        message="Something went wrong while loading this repository."
        actionLabel="Try again"
        onAction={() => setReloadCount((n) => n + 1)}
      />
    );
  } else if (hasQuery) {
    emptyState = (
      <EmptyState icon={FiSearch} title="No matching items" message="Try a different search or filter." />
    );
  } else {
    emptyState = (
      <EmptyState
        icon={FiInbox}
        title={(config.empty && config.empty.title) || "Nothing here yet"}
        message={config.empty && config.empty.message}
      />
    );
  }

  const rowActionItems = config.rowActions || [];
  const accent = config.tone === "red" ? "red" : "navy";

  return (
    <SectionCard
      tone={showHeader ? config.tone : undefined}
      title={showHeader ? headerTitle : undefined}
      subtitle={showHeader ? config.subtitle : undefined}
      actions={showHeader ? headerAction : undefined}
      bodyPadding={0}
      {...rest}
    >
      {showTabs && tabs.length > 0 && (
        <Tabs tabs={tabs} accent={accent} size="md" value={activeTab.id} onChange={handleTabChange} />
      )}

      <Box px={compact ? 3 : "cardPadding"} py={3}>
        <TableToolbar
          // remount (clearing search & filters) when the list itself changes
          key={`${repositoryKey}-${capability || "all"}`}
          filters={filters}
          searchPlaceholder={config.searchPlaceholder}
          onChange={handleQueryChange}
          onFilterClick={onFilterClick}
        />
      </Box>

      <DataTable
        // remount on tab change so the header sort arrow follows the tab's sort
        key={activeTab.id}
        columns={columns}
        data={error ? [] : pageItems}
        selectable={selectable}
        selectedKeys={selectedIds}
        onSelectionChange={updateSelection}
        rowActions={
          rowActionItems.length
            ? (row) => (
                <RowActionMenu
                  items={rowActionItems.map((a) => ({
                    label: a.label,
                    onClick: () => onRowAction && onRowAction(a.id, row),
                  }))}
                />
              )
            : undefined
        }
        onRowClick={onRowClick}
        isLoading={isLoading}
        loadingRows={pageSize}
        emptyState={emptyState}
        defaultSort={sort || undefined}
        manualSort
        onSortChange={(next) => {
          setSort(next);
          setPage(1);
        }}
        size={compact ? "sm" : "md"}
        minWidth={compact ? "560px" : "640px"}
        ariaLabel={`${config.title} items`}
      />

      {!error && (
        <Box px={compact ? 3 : "cardPadding"} py={3} borderTop="1px solid" borderColor="border.default">
          <Pagination
            page={currentPage}
            pageSize={pageSize}
            total={sortedItems.length}
            onPageChange={setPage}
            itemLabel={config.itemLabel || "items"}
            isDisabled={isLoading}
          />
        </Box>
      )}
    </SectionCard>
  );
};

export default RepositoryPanel;
