import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

// Default fields, in the order shown in the mockup.
export const PROJECT_CONTEXT_FIELDS = [
  { key: "client", label: "Client" },
  { key: "project", label: "Project" },
  { key: "system", label: "System / App" },
  { key: "methodology", label: "Methodology" },
  { key: "status", label: "Project Status" },
  { key: "maturity", label: "Maturity" },
];

const formatValue = (value) => (Array.isArray(value) ? value.join(" → ") : value);

const hasValue = (value) =>
  Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && value !== "";

const ProjectContextBar = ({ context = {}, fields = PROJECT_CONTEXT_FIELDS, ...rest }) => {
  const items = fields.filter((f) => hasValue(context[f.key]));

  // No project data – nothing to show.
  if (items.length === 0) return null;

  return (
    <Flex
      as="dl"
      aria-label="Project context"
      wrap="wrap"
      gap={2}
      {...rest}
    >
      {items.map(({ key, label }) => (
        <Box
          key={key}
          display="flex"
          alignItems="baseline"
          gap={1}
          px={3}
          py={2}
          bg="bg.subtle"
          borderRadius="md"
          fontSize="sm"
          color="text.primary"
        >
          <Text as="dt" fontWeight="semibold" whiteSpace="nowrap">
            {label}:
          </Text>
          <Text as="dd" fontWeight="medium">
            {formatValue(context[key])}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default ProjectContextBar;
