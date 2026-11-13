import React from "react";
import { Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import Card from "./Card";

// Value colour (and matching icon circle) per tone. Theme tokens only.
const TONES = {
  default: { value: "text.primary", iconBg: "bg.navTint", iconColor: "navy.700" },
  red: { value: "text.alert", iconBg: "bg.redTint", iconColor: "red.500" },
  amber: { value: "accent.amber.fg", iconBg: "accent.amber.bg", iconColor: "accent.amber.fg" },
  green: { value: "accent.green.fg", iconBg: "accent.green.bg", iconColor: "accent.green.fg" },
};

// One metric tile: icon, label, value. e.g.
// <StatCard icon={FiFileText} label="Evidence Items" value="124" />
// <StatCard icon={FiAlertTriangle} label="Gaps Identified" value="3" tone="red" />
export const StatCard = ({ icon, label, value, tone = "default" }) => {
  const t = TONES[tone] || TONES.default;

  return (
    <Card h="100%">
      <Flex align="flex-start" gap={3}>
        {icon && (
          <Flex
            align="center"
            justify="center"
            boxSize="40px"
            borderRadius="full"
            bg={t.iconBg}
            color={t.iconColor}
            flexShrink={0}
          >
            <Icon as={icon} boxSize="20px" aria-hidden="true" />
          </Flex>
        )}
        <Flex direction="column" gap={1} minW={0}>
          <Text fontSize="sm" color="text.secondary" lineHeight="short">
            {label}
          </Text>
          <Text fontSize="xl" fontWeight="bold" color={t.value} lineHeight="short">
            {value}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

// 4 per row on large screens, wraps to 2 / 1 on smaller screens. e.g.
// <StatGrid stats={[{ icon, label, value, tone }, ...]} />
export const StatGrid = ({ stats = [] }) => (
  <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
    {stats.map((stat) => (
      <StatCard key={stat.label} {...stat} />
    ))}
  </SimpleGrid>
);

export default StatCard;
