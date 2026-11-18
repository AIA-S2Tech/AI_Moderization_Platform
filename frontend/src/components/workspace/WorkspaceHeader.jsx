// WorkspaceHeader (T-14).
// Top of the workspace card: "‹ Back to Workspace" link, capability title,
// StatusBadge, "% Complete" and a ⋮ menu (RowActionMenu).
//
// Props:
//   title           : capability name, e.g. "Legacy Discovery"
//   status          : workspace status, e.g. "Certified" (StatusBadge)
//   percentComplete : number 0–100 → "100% Complete" (hidden when null)
//   backTo          : path of the back link (default: dashboard – Project Workspace)
//   backLabel       : text of the back link (default "Back to Workspace")
//   menuItems       : ⋮ menu items [{ label, onClick }] – menu hidden when empty
//   isLoading       : skeletons instead of the status & percentage
//   ...rest         : props for the outer box (e.g. px, borderBottom)
//
// Example:
//   <WorkspaceHeader title="Legacy Discovery" status="Certified" percentComplete={100}
//     menuItems={[{ label: "Export Summary", onClick: exportSummary }]} />

import React from "react";
import { Box, Flex, HStack, Link, Skeleton, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import StatusBadge from "../common/StatusBadge";
import RowActionMenu from "../common/RowActionMenu";
import { ROUTES } from "../../config/routes";

const WorkspaceHeader = ({
  title,
  status,
  percentComplete,
  backTo = ROUTES.DASHBOARD,
  backLabel = "Back to Workspace",
  menuItems = [],
  isLoading = false,
  ...rest
}) => (
  <Flex
    px="cardPadding"
    py={4}
    align={{ base: "flex-start", md: "center" }}
    justify="space-between"
    direction={{ base: "column", md: "row" }}
    gap={3}
    {...rest}
  >
    <Box minW={0}>
      <Link
        as={RouterLink}
        to={backTo}
        display="inline-flex"
        alignItems="center"
        gap={1}
        fontSize="xs"
        color="text.secondary"
        _hover={{ color: "text.link", textDecoration: "none" }}
        _focusVisible={{ boxShadow: "focus", outline: "none", borderRadius: "sm" }}
      >
        <FiChevronLeft aria-hidden="true" />
        {backLabel}
      </Link>
      <Text as="h2" mt={1} fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="text.primary" lineHeight="short">
        {title}
      </Text>
    </Box>

    <HStack spacing={4} flexShrink={0}>
      {isLoading ? (
        <>
          <Skeleton h="22px" w="80px" borderRadius="full" startColor="neutral.100" endColor="neutral.200" />
          <Skeleton h="16px" w="96px" borderRadius="sm" startColor="neutral.100" endColor="neutral.200" />
        </>
      ) : (
        <>
          {status && <StatusBadge status={status} />}
          {percentComplete != null && (
            <Text fontSize="sm" fontWeight="semibold" color="text.primary" whiteSpace="nowrap">
              {percentComplete}% Complete
            </Text>
          )}
        </>
      )}
      {menuItems.length > 0 && <RowActionMenu items={menuItems} />}
    </HStack>
  </Flex>
);

export default WorkspaceHeader;
