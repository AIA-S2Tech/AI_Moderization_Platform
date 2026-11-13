import React, { useCallback, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import Button from "./Button";
import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";

const emptyFilters = (filters) =>
  filters.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {});

const TableToolbar = ({
  filters = [],
  onChange,
  searchPlaceholder = "Search…",
  initialState,
  onFilterClick,
  ...rest
}) => {
  const [state, setState] = useState(() => ({
    search: initialState?.search || "",
    filters: { ...emptyFilters(filters), ...(initialState?.filters || {}) },
  }));

  const update = useCallback(
    (next) => {
      setState(next);
      onChange?.(next);
    },
    [onChange]
  );

  const handleSearch = useCallback(
    (search) => update({ ...state, search }),
    [state, update]
  );

  const handleFilter = (key, value) =>
    update({ ...state, filters: { ...state.filters, [key]: value } });

  return (
    <Flex align="center" wrap="wrap" gap={3} {...rest}>
      <Box flex={{ base: "1 1 100%", md: "1 1 240px" }} maxW={{ md: "360px" }}>
        <SearchInput
          placeholder={searchPlaceholder}
          value={initialState?.search || ""}
          onSearch={handleSearch}
        />
      </Box>

      {filters.map((f) => (
        <Box key={f.key} flex={{ base: "1 1 140px", md: "0 0 auto" }}>
          <FilterSelect
            label={f.label}
            options={f.options}
            value={state.filters[f.key] ?? ""}
            onChange={(value) => handleFilter(f.key, value)}
            w="100%"
          />
        </Box>
      ))}

      <Button
        variant="outline"
        size="sm"
        icon={<FiFilter />}
        aria-label="More filters"
        onClick={onFilterClick}
      />
    </Flex>
  );
};

export default TableToolbar;
