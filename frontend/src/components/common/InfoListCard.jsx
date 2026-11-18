import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FiCheck, FiChevronsRight } from "react-icons/fi";
import Card from "./Card";

// Header band colour per tone. Theme tokens only.
const TONES = {
  navy: { band: "navy.800", marker: "navy.800" },
  red: { band: "red.500", marker: "red.500" },
};

// Marker in front of each list item.
// bullets  : small round bullet with »  (e.g. "1. EVIDENCE REPOSITORY")
// numbered : numbered circles          (Key Principles)
// ticks    : green ticks               (Benefits)
const Marker = ({ listStyle, index, color }) => {
  const circle = {
    align: "center",
    justify: "center",
    borderRadius: "full",
    flexShrink: 0,
    color: "text.inverse",
    "aria-hidden": "true",
  };

  if (listStyle === "numbered") {
    return (
      <Flex {...circle} boxSize="22px" bg={color} fontSize="xs" fontWeight="bold">
        {index + 1}
      </Flex>
    );
  }
  if (listStyle === "ticks") {
    return (
      <Flex {...circle} boxSize="18px" bg="accent.green.fg" mt="2px">
        <Icon as={FiCheck} boxSize="12px" strokeWidth={3} />
      </Flex>
    );
  }
  return (
    <Flex {...circle} boxSize="16px" bg={color} mt="3px">
      <Icon as={FiChevronsRight} boxSize="11px" strokeWidth={3} />
    </Flex>
  );
};

// With a number : card with a coloured header band, e.g. "1. EVIDENCE REPOSITORY"
// Without       : plain heading + list (Key Principles, Benefits)
// e.g.
// <InfoListCard number={1} title="Evidence Repository" tone="navy" listStyle="bullets"
//   items={["Stores all source evidence provided by the client…", "…"]} />
// <InfoListCard title="Benefits" listStyle="ticks" items={["Ensures transparency…", "…"]} />
const InfoListCard = ({ number, title, tone = "navy", listStyle = "bullets", items = [] }) => {
  const t = TONES[tone] || TONES.navy;
  const hasBand = number != null;

  const list = (
    <Box
      as={listStyle === "numbered" ? "ol" : "ul"}
      listStyleType="none"
      px={hasBand ? "cardPadding" : 0}
      py={hasBand ? 4 : 0}
    >
      {items.map((item, index) => (
        <Flex as="li" key={item} align="flex-start" gap={3} mb={index < items.length - 1 ? 2 : 0}>
          <Marker listStyle={listStyle} index={index} color={t.marker} />
          <Text fontSize="sm" color="text.primary">
            {item}
          </Text>
        </Flex>
      ))}
    </Box>
  );

  if (!hasBand) {
    return (
      <Box>
        <Text as="h3" fontSize="xl" fontWeight="bold" color="text.primary" mb={3}>
          {title}
        </Text>
        {list}
      </Box>
    );
  }

  return (
    <Card padding={0} overflow="hidden">
      <Box bg={t.band} px="cardPadding" py={3}>
        <Text
          as="h3"
          fontSize="md"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wide"
          color="text.inverse"
        >
          {`${number}. ${title}`}
        </Text>
      </Box>
      {list}
    </Card>
  );
};

export default InfoListCard;
