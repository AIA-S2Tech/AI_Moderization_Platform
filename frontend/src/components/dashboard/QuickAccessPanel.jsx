import React from "react";
import { Stack } from "@chakra-ui/react";
import SectionCard from "../common/SectionCard";
import QuickAccessItem from "./QuickAccessItem";
import { QUICK_ACCESS_ITEMS } from "../../config/quickAccessItems";

// "QUICK ACCESS" card of the dashboard: the 6 items from config/quickAccessItems.js.
// The page passes the red counts it gets from a service, e.g.
// <QuickAccessPanel counts={{ smeTasks: 23, issues: 21 }} />
const QuickAccessPanel = ({ counts = {}, ...rest }) => (
  <SectionCard title="Quick Access" showDivider={false} {...rest}>
    <Stack as="nav" aria-label="Quick access" spacing={1}>
      {QUICK_ACCESS_ITEMS.map((item) => (
        <QuickAccessItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          path={item.path}
          count={item.countKey ? counts[item.countKey] : undefined}
        />
      ))}
    </Stack>
  </SectionCard>
);

export default QuickAccessPanel;
