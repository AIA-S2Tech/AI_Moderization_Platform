import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Card from "../common/Card";
import { formatDateMedium } from "../../utils/date";

// Icon circle colours per tone. Theme tokens only.
const TONES = {
  navy: { bg: "bg.navTint", fg: "navy.800" },
  purple: { bg: "accent.purple.bg", fg: "accent.purple.fg" },
  green: { bg: "accent.green.bg", fg: "accent.green.fg" },
};

// One repository on the dashboard: icon, title, description, item count and
// last updated. The whole card links to the repository page. e.g.
// <RepositorySummaryCard icon={FiFileText} title="Evidence Repository"
//   description="Source material and client-provided evidence" count={324}
//   lastUpdated="2026-05-21" path="/repositories/evidence" />
const RepositorySummaryCard = ({ icon, tone = "navy", title, description, count, lastUpdated, path }) => {
  const t = TONES[tone] || TONES.navy;

  return (
    <Card
      as={RouterLink}
      to={path}
      isHoverable
      display="flex"
      gap={4}
      alignItems="center"
      h="100%"
      _focusVisible={{ boxShadow: "focus", outline: "none" }}
    >
      <Flex
        align="center"
        justify="center"
        boxSize="56px"
        flexShrink={0}
        borderRadius="full"
        bg={t.bg}
        color={t.fg}
        aria-hidden="true"
      >
        <Icon as={icon} boxSize="26px" />
      </Flex>

      <Box flex="1" minW={0}>
        <Text fontSize="sm" fontWeight="bold" color="text.primary" textTransform="uppercase">
          {title}
        </Text>
        <Text fontSize="sm" color="text.secondary" mt={1}>
          {description}
        </Text>
        <Flex mt={2} align="baseline" justify="space-between" gap={2} wrap="wrap">
          <Text fontSize="sm" color="text.secondary">
            <Text as="span" fontSize="md" fontWeight="bold" color="text.primary">
              {count != null ? count.toLocaleString() : "—"}
            </Text>{" "}
            Items
          </Text>
          <Text fontSize="xs" color="text.muted">
            Last Updated: {formatDateMedium(lastUpdated)}
          </Text>
        </Flex>
      </Box>
    </Card>
  );
};

export default RepositorySummaryCard;
