import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

// One Quick Access row: icon tile, title, subtitle and an optional red count. e.g.
// <QuickAccessItem icon={FiClipboard} title="SME Tasks" subtitle="View open validation tasks"
//   count={23} path="/sme-tasks" />
// With a path the whole row is a link; without one it is plain (page not built yet).
const QuickAccessItem = ({ icon, title, subtitle, count, path }) => {
  const linkProps = path
    ? {
        as: RouterLink,
        to: path,
        _hover: { bg: "bg.subtle", textDecoration: "none" },
        _focusVisible: { boxShadow: "focus", outline: "none" },
      }
    : {};

  return (
    <Flex align="center" gap={4} px={2} py={3} borderRadius="lg" {...linkProps}>
      <Flex
        align="center"
        justify="center"
        boxSize="48px"
        flexShrink={0}
        borderRadius="lg"
        bg="bg.navTint"
        color="navy.800"
        aria-hidden="true"
      >
        <Icon as={icon} boxSize="22px" />
      </Flex>

      <Box flex="1" minW={0}>
        <Text fontSize="sm" fontWeight="bold" color="text.primary" noOfLines={1}>
          {title}
        </Text>
        <Text fontSize="sm" color="text.secondary" noOfLines={1}>
          {subtitle}
        </Text>
      </Box>

      {count != null && (
        <Text fontSize="lg" fontWeight="bold" color="text.alert" flexShrink={0} aria-label={`${count} open`}>
          {count}
        </Text>
      )}
    </Flex>
  );
};

export default QuickAccessItem;
