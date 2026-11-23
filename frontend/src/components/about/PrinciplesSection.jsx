// "Principles we build on" (numbered) next to "What teams get" (checkmarks).

import { Box, Flex, Heading, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import AboutSection, { NumberCircle } from "./AboutSection";
import { PRINCIPLES, TEAM_BENEFITS } from "../../config/about";

const CheckCircle = () => (
  <Flex
    flexShrink={0}
    w={6}
    h={6}
    borderRadius="full"
    bg="status.success.fg"
    align="center"
    justify="center"
    aria-hidden="true"
  >
    <Icon as={FiCheck} color="text.inverse" boxSize={3.5} strokeWidth={3} />
  </Flex>
);

const PointList = ({ title, items, as, marker }) => (
  <Box>
    <Heading as="h2" fontSize="xl" fontWeight="bold" color="navy.800" mb={5}>
      {title}
    </Heading>
    <VStack as={as} listStyleType="none" spacing={4} align="stretch" m={0}>
      {items.map((item, i) => (
        <Flex as="li" key={item} gap={3} align="flex-start">
          {marker(i)}
          <Text fontSize="sm" color="text.primary" pt="2px">
            {item}
          </Text>
        </Flex>
      ))}
    </VStack>
  </Box>
);

const PrinciplesSection = () => (
  <AboutSection>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 12 }}>
      <PointList
        title={PRINCIPLES.title}
        items={PRINCIPLES.items}
        as="ol"
        marker={(i) => (
          <NumberCircle size={6} fontSize="xs">
            {i + 1}
          </NumberCircle>
        )}
      />
      <PointList
        title={TEAM_BENEFITS.title}
        items={TEAM_BENEFITS.items}
        as="ul"
        marker={() => <CheckCircle />}
      />
    </SimpleGrid>
  </AboutSection>
);

export default PrinciplesSection;
