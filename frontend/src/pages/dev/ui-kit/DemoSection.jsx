// Layout helpers for the UI Kit page (T-07). Dev-only – not used by real pages.

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "../../../components/common/Card";

// One block per component: title, short description, then the examples.
export const DemoSection = ({ id, title, description, children }) => (
  // scrollMarginTop: the TopNav is sticky (~140px), so "Jump to" links must stop below it.
  <Card as="section" id={id} scrollMarginTop="160px">
    <Text as="h2" textStyle="sectionTitle" fontSize="md">
      {title}
    </Text>
    {description && (
      <Text textStyle="caption" mt={1} mb={5}>
        {description}
      </Text>
    )}
    <Flex direction="column" gap={6}>
      {children}
    </Flex>
  </Card>
);

// A labelled row of examples inside a DemoSection.
export const DemoRow = ({ label, children, ...rest }) => (
  <Box>
    <Text textStyle="label" mb={2}>
      {label}
    </Text>
    <Flex wrap="wrap" align="center" gap={3} {...rest}>
      {children}
    </Flex>
  </Box>
);
