import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import Card from "./Card";

// Colours per tone (navy / red workspaces). Theme tokens only.
const TONES = {
  navy: { bg: "bg.navTint", border: "border.navy", hoverBorder: "navy.300", icon: "navy.700", text: "navy.800" },
  red: { bg: "bg.redTint", border: "border.red", hoverBorder: "red.300", icon: "red.500", text: "text.primary" },
};

// One clickable action row: icon, label, chevron. e.g.
// <ActionListItem icon={FiFileText} label="Generate System Overview" onClick={run} />
// <ActionListItem icon={FiMap} label="Define Modernization Path" tone="red" isDisabled />
const ActionListItem = ({ icon, label, tone = "navy", isDisabled = false, onClick }) => {
  const t = TONES[tone] || TONES.navy;

  return (
    <Card
      as="button"
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      w="100%"
      px={4}
      py={3}
      textAlign="left"
      bg={t.bg}
      borderColor={t.border}
      isHoverable={!isDisabled}
      _hover={isDisabled ? undefined : { borderColor: t.hoverBorder, boxShadow: "cardHover" }}
      _focusVisible={{ outline: "none", boxShadow: "focus" }}
      _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
    >
      <Flex align="center" gap={3}>
        {icon && <Icon as={icon} boxSize="20px" color={t.icon} flexShrink={0} aria-hidden="true" />}
        <Text flex="1" fontSize="sm" fontWeight="semibold" color={t.text}>
          {label}
        </Text>
        <Icon as={FiChevronRight} boxSize="16px" color="text.muted" aria-hidden="true" />
      </Flex>
    </Card>
  );
};

export default ActionListItem;
