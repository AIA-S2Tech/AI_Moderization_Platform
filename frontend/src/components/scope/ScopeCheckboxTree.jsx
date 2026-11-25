// ScopeCheckboxTree (S2-06).
// A workspace checkbox with its deliverables as child checkboxes (Project Scope concept,
// screen 2). Checking the workspace selects all its deliverables, clearing it clears them,
// and it shows as indeterminate (–) when only some are selected.
// Native checkboxes, so it works with the keyboard: Tab moves between boxes, Space toggles.
//
// Props:
//   groups     : [{ id, label, items: [{ id, label }] }] – e.g. from
//                config/methodology.js getDeliverablesByCapability(), mapped to this shape
//   value      : selected item (deliverable) ids
//   onChange   : (ids) => void – new selection, in the order of `groups`
//   isReadOnly : show the selection without allowing changes (scope history views)
//   ...rest    : props for the outer box
//
// Example:
//   const groups = getDeliverablesByCapability().map((w) => ({
//     id: w.capability, label: `${w.step}. ${w.label}`,
//     items: w.deliverables.map((d) => ({ id: d.id, label: d.name })),
//   }));
//   <ScopeCheckboxTree groups={groups} value={selectedIds} onChange={setSelectedIds} />
//
// One group per call is fine too – ScopeWorkspaceCard (S2-08) shows one workspace per card.

import React, { useId } from "react";
import { Box, Checkbox, Flex, Text, VisuallyHidden } from "@chakra-ui/react";

const CHECKBOX_STYLES = {
  colorScheme: "navy",
  borderColor: "border.strong",
  alignItems: "flex-start",
  // Box lines up with the first line of a wrapped label.
  sx: { "& > .chakra-checkbox__control": { mt: "2px" } },
};

const ScopeCheckboxTree = ({ groups = [], value = [], onChange, isReadOnly = false, ...rest }) => {
  const selected = new Set(value);
  // Unique per tree, so two trees with the same groups on one page don't share ids.
  const treeId = useId();

  // Keep the selection in groups order so saved scopes compare cleanly.
  const emit = (nextSet) => {
    if (isReadOnly) return;
    const allIds = groups.flatMap((g) => g.items.map((i) => i.id));
    const inTree = new Set(allIds);
    // Ids not in these groups (e.g. other workspaces' cards) are kept as they were.
    const others = value.filter((id) => !inTree.has(id));
    onChange?.([...others, ...allIds.filter((id) => nextSet.has(id))]);
  };

  const toggleItem = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    emit(next);
  };

  const toggleGroup = (group, checkAll) => {
    const next = new Set(selected);
    group.items.forEach((i) => (checkAll ? next.add(i.id) : next.delete(i.id)));
    emit(next);
  };

  return (
    <Flex direction="column" gap={4} {...rest}>
      {groups.map((group) => {
        const count = group.items.filter((i) => selected.has(i.id)).length;
        const allChecked = group.items.length > 0 && count === group.items.length;
        const someChecked = count > 0 && !allChecked;
        const childrenId = `scope-tree-${treeId}-${group.id}-items`;

        return (
          <Box key={group.id}>
            <Checkbox
              {...CHECKBOX_STYLES}
              isChecked={allChecked}
              isIndeterminate={someChecked}
              isReadOnly={isReadOnly}
              isDisabled={group.items.length === 0}
              onChange={() => toggleGroup(group, !allChecked)}
              aria-controls={childrenId}
            >
              <Text as="span" fontSize="sm" fontWeight="semibold" color="text.primary">
                {group.label}
              </Text>
              <Text as="span" textStyle="caption" ml={2} aria-hidden="true">
                {count} / {group.items.length}
              </Text>
              <VisuallyHidden>{`(${count} of ${group.items.length} selected)`}</VisuallyHidden>
            </Checkbox>

            <Flex
              as="ul"
              id={childrenId}
              role="group"
              aria-label={`${group.label} deliverables`}
              direction="column"
              gap={2}
              listStyleType="none"
              mt={2}
              ml={3}
              pl={4}
              borderLeft="1px solid"
              borderColor="border.default"
            >
              {group.items.map((item) => (
                <Box as="li" key={item.id}>
                  <Checkbox
                    {...CHECKBOX_STYLES}
                    isChecked={selected.has(item.id)}
                    isReadOnly={isReadOnly}
                    onChange={() => toggleItem(item.id)}
                  >
                    <Text as="span" fontSize="sm" color="text.primary">
                      {item.label}
                    </Text>
                  </Checkbox>
                </Box>
              ))}
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};

export default ScopeCheckboxTree;
