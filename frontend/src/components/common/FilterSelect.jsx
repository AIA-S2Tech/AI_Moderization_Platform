import React from "react";
import { Select } from "@chakra-ui/react";

// Accept plain strings or { value, label } objects.
const normalise = (option) =>
  typeof option === "object" ? option : { value: option, label: option };

const FilterSelect = ({
  label,
  options = [],
  value = "",
  onChange,
  size = "sm",
  ...rest
}) => (
  <Select
    size={size}
    w="auto"
    minW="160px"
    aria-label={`Filter by ${label}`}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    bg="bg.surface"
    color="text.primary"
    borderColor="border.default"
    borderRadius="md"
    _hover={{ borderColor: "border.strong" }}
    _focusVisible={{ borderColor: "navy.500", boxShadow: "focus" }}
    {...rest}
  >
    <option value="">All {label}</option>
    {options.map(normalise).map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </Select>
);

export default FilterSelect;
