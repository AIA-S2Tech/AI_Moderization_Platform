// WorkspaceCard (T-26).
// One dashboard card per methodology workspace: number circle, title, description,
// StatusBadge, "% complete" and a chevron, on a light navy or red tint.
// The whole card is a link to the workspace page.
//
// Props:
//   number          : step number 1–5 (circle)
//   title           : capability name, e.g. "Legacy Discovery" (shown uppercase)
//   description     : one-line description (config/workspaces.js subtitle)
//   tone            : navy | red (default navy)
//   status          : workspace status, e.g. "Certified" (StatusBadge)
//   percentComplete : number 0–100 → "100%" (hidden when null)
//   to              : route to open, e.g. "/workspaces/legacy-discovery"
//   isLoading       : skeletons instead of the status & percentage
//   ...rest         : props for the outer Card
//
// Example:
//   <WorkspaceCard number={1} title="Legacy Discovery" description="Understand what exists today…"
//     status="Certified" percentComplete={100} to="/workspaces/legacy-discovery" />

import React from "react";
import { Flex, Icon, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";

// Colours per tone. Theme tokens only.
const TONES = {
  navy: { bg: "bg.navTint", border: "border.navy", hoverBorder: "navy.300", circle: "navy.800" },
  red: { bg: "bg.redTint", border: "border.red", hoverBorder: "red.300", circle: "red.500" },
};

const skeletonProps = { startColor: "neutral.100", endColor: "neutral.200", borderRadius: "sm" };

const WorkspaceCard = ({
  number,
  title,
  description,
  tone = "navy",
  status,
  percentComplete,
  to,
  isLoading = false,
  ...rest
}) => {
  const t = TONES[tone] || TONES.navy;

  return (
    <Card
      as={RouterLink}
      to={to}
      display="block"
      isHoverable
      px={4}
      py={4}
      bg={t.bg}
      borderColor={t.border}
      _hover={{ borderColor: t.hoverBorder, boxShadow: "cardHover", textDecoration: "none" }}
      _focusVisible={{ boxShadow: "focus", outline: "none" }}
      {...rest}
    >
      <Flex align="flex-start" gap={3}>
        <Flex
          aria-hidden="true"
          flexShrink={0}
          align="center"
          justify="center"
          boxSize="28px"
          borderRadius="full"
          bg={t.circle}
          color="text.inverse"
          fontSize="sm"
          fontWeight="bold"
        >
          {number}
        </Flex>

        {/* Status + % sit on the right when the card is wide, and under the text when it
            is narrow (phones, and the dashboard's centre column between 1024 and 1440px),
            so long titles never break mid-word. */}
        <Flex
          flex="1"
          minW={0}
          direction={{ base: "column", sm: "row", lg: "column", xl: "row" }}
          gap={{ base: 2, sm: 3, lg: 2, xl: 3 }}
        >
          <Stack spacing={1} flex="1" minW={0}>
            <Text as="h3" fontSize="sm" fontWeight="bold" color="text.primary" textTransform="uppercase" letterSpacing="wide">
              {title}
            </Text>
            {description && (
              <Text fontSize="sm" color="text.secondary" lineHeight="short">
                {description}
              </Text>
            )}
          </Stack>

          <Stack
            direction={{ base: "row", sm: "column", lg: "row", xl: "column" }}
            spacing={2}
            align="center"
            flexShrink={0}
            minW={{ sm: "88px", lg: 0, xl: "88px" }}
          >
            {isLoading ? (
              <>
                <Skeleton h="20px" w="72px" {...skeletonProps} borderRadius="full" />
                <Skeleton h="16px" w="40px" {...skeletonProps} />
              </>
            ) : (
              <>
                {status && <StatusBadge status={status} size="sm" />}
                {percentComplete != null && (
                  <Text fontSize="md" fontWeight="bold" color="text.primary">
                    {percentComplete}%
                  </Text>
                )}
              </>
            )}
          </Stack>
        </Flex>

        <Icon as={FiChevronRight} alignSelf="center" boxSize="18px" color="text.secondary" aria-hidden="true" />
      </Flex>
    </Card>
  );
};

export default WorkspaceCard;
