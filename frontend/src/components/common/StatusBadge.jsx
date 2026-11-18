// Shared StatusBadge (T-04).
// Small coloured label for a status, e.g. the green "Certified" tag in the mockups.
// Colours come from the status map in config/statusConfig.js – pages only pass the status text.
//
// Props:
//   status : status text, e.g. "Certified", "In Progress" (case-insensitive)
//   size   : sm | md (default md)
//
// Examples:
//   <StatusBadge status="Certified" />
//   <StatusBadge status="Pending SME" size="sm" />
//   <StatusBadge status="Something new" />   → neutral grey, shows the text as given

import React from "react";
import { Box } from "@chakra-ui/react";
import {
  getStatusConfig,
  STATUS_TONES,
  DEFAULT_STATUS_TONE,
} from "../../config/statusConfig";

const sizeStyles = {
  sm: { fontSize: "2xs", px: 2, py: "1px" },
  md: { fontSize: "xs", px: 2.5, py: "3px" },
};

const StatusBadge = ({ status, size = "md", ...rest }) => {
  const { label, tone } = getStatusConfig(status);
  const colorGroup = STATUS_TONES[tone] || STATUS_TONES[DEFAULT_STATUS_TONE];
  const s = sizeStyles[size] || sizeStyles.md;

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      whiteSpace="nowrap"
      fontWeight="semibold"
      lineHeight="normal"
      borderRadius="md"
      border="1px solid"
      bg={`${colorGroup}.bg`}
      color={`${colorGroup}.fg`}
      borderColor={`${colorGroup}.border`}
      fontSize={s.fontSize}
      px={s.px}
      py={s.py}
      {...rest}
    >
      {label}
    </Box>
  );
};

export default StatusBadge;
