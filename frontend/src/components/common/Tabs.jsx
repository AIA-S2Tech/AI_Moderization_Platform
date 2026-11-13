// Shared Tabs (T-06).
// Underline tabs as in the mockups: workspaces (Overview / Actions / Artifacts /
// Evidence / SME Tasks / Issues) and repository panels (All / By Type / By Source …).
// Built on Chakra Tabs, so keyboard support comes built in: arrow keys move
// between tabs, Home/End jump to first/last, and the ARIA roles are set.
//
// Props:
//   tabs         : [{ id, label, content?, isDisabled? }]
//                  If no tab has `content`, only the tab bar is shown – use this
//                  when tabs act as a filter (repository panels).
//   accent       : navy | red – colour of the active tab (default navy)
//   size         : sm | md (default sm)
//                  sm = workspace tabs (small text on a grey bar)
//                  md = repository panel tabs (larger text on a white bar)
//   value        : active tab id  ─┐ controlled mode – pass both
//   onChange     : (id) => void   ─┘ (onChange is also called in the other modes)
//   defaultValue : first active tab id in uncontrolled mode (default: first tab)
//   syncWithUrl  : true → keeps the active tab in the URL as ?tab=<id>
//                  "view" (any string) → uses that name instead, e.g. ?view=<id>
//                  Ignored when `value` is passed.
//   isLazy       : only render a panel the first time it is opened (default true)
//   panelPadding : padding around each panel (default "cardPadding")
//   tabListProps : extra Chakra props for the tab bar (px, bg, etc.)
//   ...rest      : props for the outer Chakra Tabs
//
// Examples:
//   // uncontrolled
//   <Tabs tabs={[{ id: "overview", label: "Overview", content: <Overview /> }, …]} />
//
//   // controlled
//   const [tab, setTab] = useState("actions");
//   <Tabs tabs={tabs} value={tab} onChange={setTab} accent="red" />
//
//   // URL sync (/workspaces/legacy-discovery?tab=actions)
//   <Tabs tabs={tabs} defaultValue="actions" syncWithUrl />

import React, { useState } from "react";
import {
  Tabs as ChakraTabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const accentColors = {
  navy: "navy.800",
  red: "red.500",
};

const sizeStyles = {
  sm: { fontSize: "sm", py: 3, listBg: "bg.subtle" },
  md: { fontSize: "md", py: 3.5, listBg: "bg.surface" },
};

const Tabs = ({
  tabs = [],
  accent = "navy",
  size = "sm",
  value,
  onChange,
  defaultValue,
  syncWithUrl = false,
  isLazy = true,
  panelPadding = "cardPadding",
  tabListProps,
  ...rest
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const firstEnabledId = (tabs.find((t) => !t.isDisabled) || tabs[0] || {}).id;
  const [internalValue, setInternalValue] = useState(
    defaultValue !== undefined ? defaultValue : firstEnabledId
  );

  const isControlled = value !== undefined;
  const urlParam = typeof syncWithUrl === "string" ? syncWithUrl : "tab";
  const useUrl = Boolean(syncWithUrl) && !isControlled;
  const urlValue = useUrl ? searchParams.get(urlParam) : null;
  const isKnownId = (id) => tabs.some((t) => t.id === id && !t.isDisabled);

  // Which tab is active: controlled value > valid URL value > internal state.
  let activeId = internalValue;
  if (isControlled) activeId = value;
  else if (useUrl && isKnownId(urlValue)) activeId = urlValue;

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === activeId)
  );

  const handleChange = (index) => {
    const id = tabs[index] && tabs[index].id;
    if (id === undefined) return;

    if (!isControlled) {
      setInternalValue(id);
      if (useUrl) {
        const next = new URLSearchParams(searchParams);
        next.set(urlParam, id);
        // replace: switching tabs should not fill the browser history
        setSearchParams(next, { replace: true });
      }
    }
    if (onChange) onChange(id);
  };

  const accentColor = accentColors[accent] || accentColors.navy;
  const s = sizeStyles[size] || sizeStyles.sm;
  const hasPanels = tabs.some((t) => t.content !== undefined);

  return (
    <ChakraTabs
      index={activeIndex}
      onChange={handleChange}
      isLazy={isLazy}
      variant="unstyled"
      {...rest}
    >
      <TabList
        bg={s.listBg}
        borderBottom="1px solid"
        borderColor="border.default"
        px={{ base: 2, md: 4 }}
        gap={{ base: 1, md: 4 }}
        overflowX="auto"
        overflowY="hidden"
        sx={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
        {...tabListProps}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            isDisabled={tab.isDisabled}
            flexShrink={0}
            whiteSpace="nowrap"
            px={{ base: 3, md: 4 }}
            py={s.py}
            mb="-1px"
            fontSize={s.fontSize}
            fontWeight="medium"
            color="text.secondary"
            borderBottom="2px solid"
            borderColor="transparent"
            transition="color 0.15s ease, border-color 0.15s ease"
            _hover={{ color: accentColor }}
            _selected={{
              color: accentColor,
              fontWeight: "semibold",
              borderColor: accentColor,
            }}
            _focusVisible={{ boxShadow: "focus", outline: "none", borderRadius: "sm" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed", _hover: { color: "text.secondary" } }}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {hasPanels && (
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.id} p={panelPadding}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      )}
    </ChakraTabs>
  );
};

export default Tabs;
