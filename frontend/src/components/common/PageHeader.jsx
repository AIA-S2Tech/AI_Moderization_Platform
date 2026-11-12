// Shared PageHeader (T-05).
// Page title block at the top of every page, e.g.
//   (1) LEGACY DISCOVERY WORKSPACE
//       Understand what exists today, how it works, and what evidence supports it.
//
// Props:
//   title       : page title (shown uppercase)
//   titleSuffix : optional smaller text after the title, e.g. "(Home)"
//   subtitle    : optional line under the title
//   number   : optional step number shown in a circle (0–5). 0 is valid (Home).
//   tone     : navy | red – colour of the number circle (default navy)
//   actions  : optional node(s) on the right (buttons etc.)
//   ...rest  : extra Chakra props for the outer Flex (mb, px, etc.)
//
// Examples:
//   <PageHeader number={0} title="Project Workspace" titleSuffix="(Home)" subtitle="High-level view …" />
//   <PageHeader number={2} tone="red" title="Business Rule Intelligence Workspace" />
//   <PageHeader title="Repositories" />

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const circleColors = {
  navy: "navy.800",
  red: "red.500",
};

const PageHeader = ({
  title,
  titleSuffix,
  subtitle,
  number,
  tone = "navy",
  actions,
  ...rest
}) => {
  const hasNumber = number !== undefined && number !== null && number !== "";

  return (
    <Flex
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      gap={4}
      {...rest}
    >
      <Flex align="center" gap={4} minW={0}>
        {hasNumber && (
          <Flex
            aria-hidden="true"
            flexShrink={0}
            align="center"
            justify="center"
            boxSize={{ base: "40px", md: "48px" }}
            borderRadius="full"
            bg={circleColors[tone] || circleColors.navy}
            color="text.inverse"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            lineHeight="1"
          >
            {number}
          </Flex>
        )}

        <Box minW={0}>
          <Text as="h1" textStyle="pageTitle" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
            {title}
            {titleSuffix && (
              <Text as="span" fontSize="0.65em" ml={2} verticalAlign="middle">
                {titleSuffix}
              </Text>
            )}
          </Text>
          {subtitle && (
            <Text textStyle="pageSubtitle" fontSize={{ base: "sm", md: "md" }} mt={1}>
              {subtitle}
            </Text>
          )}
        </Box>
      </Flex>

      {actions && (
        <Flex gap={2} flexShrink={0} wrap="wrap">
          {actions}
        </Flex>
      )}
    </Flex>
  );
};

export default PageHeader;
