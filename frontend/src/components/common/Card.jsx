// Shared Card (T-05).
// Plain white box with border, rounded corners and a soft shadow – the base for
// every panel in the mockups (dashboard sections, stat tiles, workspace panels).
//
// Props:
//   padding     : any Chakra space value (default "cardPadding" = 20px). Use 0 for
//                 cards that hold a full-width table.
//   isHoverable : lift the shadow on hover (for clickable cards)
//   ...rest     : any Chakra Box prop (as, onClick, w, etc.) – overrides the defaults
//
// Examples:
//   <Card>Content</Card>
//   <Card padding={0}><DataTable … /></Card>
//   <Card as="button" isHoverable onClick={open}>…</Card>

import React, { forwardRef } from "react";
import { Box } from "@chakra-ui/react";

const Card = forwardRef(function Card(
  { padding = "cardPadding", isHoverable = false, children, ...rest },
  ref
) {
  return (
    <Box
      ref={ref}
      bg="bg.surface"
      border="1px solid"
      borderColor="border.default"
      borderRadius="xl"
      boxShadow="card"
      p={padding}
      transition="box-shadow 0.15s ease"
      _hover={isHoverable ? { boxShadow: "cardHover" } : undefined}
      cursor={isHoverable ? "pointer" : undefined}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default Card;
