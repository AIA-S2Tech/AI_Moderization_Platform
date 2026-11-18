import React from "react";
import { Icon, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import Button from "./Button";

// Kebab (⋮) menu. Items come from the page, e.g.
// [{ label: "View", onClick }, { label: "Download", onClick }, ...]
// Closes on outside click and ESC (Chakra Menu behaviour).
const RowActionMenu = ({ items = [] }) => (
  <Menu placement="bottom-end" isLazy>
    {/* MenuButton always wraps its content in a <span>, so the icon goes inside
        as a child (an 'icon' prop would be ignored and the button would look empty). */}
    <MenuButton
      as={Button}
      variant="ghost"
      size="sm"
      px={0}
      aria-label="Row actions"
      // Don't trigger a click on the table row behind the button.
      onClick={(e) => e.stopPropagation()}
    >
      <Icon as={FiMoreVertical} display="block" mx="auto" aria-hidden="true" />
    </MenuButton>
    {/* Portal keeps the menu from being clipped by a scrolling table. */}
    <Portal>
      <MenuList
        minW="160px"
        py={1}
        bg="bg.surface"
        borderColor="border.default"
        boxShadow="dropdown"
        zIndex="dropdown"
      >
        {items.map((item) => (
          <MenuItem
            key={item.label}
            fontSize="sm"
            color="text.primary"
            _hover={{ bg: "bg.subtle" }}
            _focus={{ bg: "bg.subtle" }}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick?.();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Portal>
  </Menu>
);

export default RowActionMenu;
