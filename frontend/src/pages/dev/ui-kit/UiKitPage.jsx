// UI Kit showcase page – /dev/ui-kit (T-07).
// Internal page that shows every shared component in all its variants.
// Used for PR review and for component testing. Not part of the product.
//
// Adding your component:
//   1. Create demos/<Component>Demo.jsx (copy an existing demo as a starting point).
//   2. Add one line to the `demos` list below.
// Keeping each demo in its own file means developers don't edit the same lines.

import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import PageHeader from "../../../components/common/PageHeader";
import ButtonDemo from "./demos/ButtonDemo";
import StatusBadgeDemo from "./demos/StatusBadgeDemo";
import CardDemo from "./demos/CardDemo";
import TabsDemo from "./demos/TabsDemo";
import DataTableDemo from "./demos/DataTableDemo";

const demos = [
  { id: "button", label: "Button", Component: ButtonDemo },
  { id: "status-badge", label: "StatusBadge", Component: StatusBadgeDemo },
  { id: "card", label: "Card / SectionCard / PageHeader", Component: CardDemo },
  { id: "tabs", label: "Tabs", Component: TabsDemo },
  { id: "data-table", label: "DataTable", Component: DataTableDemo },
];

const UiKitPage = () => (
  // Page width and padding come from AppShell (wrapped in by ProtectedRoute).
  <Box>
    <PageHeader
      title="UI Kit"
      subtitle="Every shared component in all its variants – for review and testing."
      mb={6}
    />

    {/* Jump links */}
    <Flex as="nav" aria-label="Components" wrap="wrap" gap={2} mb={6}>
      <Text textStyle="label" alignSelf="center" mr={1}>
        Jump to:
      </Text>
      {demos.map((d) => (
        <Link
          key={d.id}
          href={`#${d.id}`}
          fontSize="sm"
          px={3}
          py={1}
          bg="bg.surface"
          border="1px solid"
          borderColor="border.default"
          borderRadius="full"
          _hover={{ bg: "bg.navTint", textDecoration: "none" }}
        >
          {d.label}
        </Link>
      ))}
    </Flex>

    <Flex direction="column" gap="sectionGap">
      {demos.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </Flex>
  </Box>
);

export default UiKitPage;
