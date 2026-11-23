// "Three repositories…" – the three repository cards plus the review pipeline
// (Generated → … → Decision-Ready) underneath.

import { Box, Flex, Heading, Icon, List, ListItem, SimpleGrid, Text } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import AboutSection, { TONES } from "./AboutSection";
import {
  REPOSITORIES_SECTION,
  REPOSITORY_OVERVIEW,
  REVIEW_PIPELINE,
} from "../../config/about";

const RepositoryCard = ({ title, subtitle, tone, points }) => (
  <Box
    bg="bg.surface"
    border="1px solid"
    borderColor="border.default"
    borderRadius="lg"
    boxShadow="card"
    overflow="hidden"
  >
    <Box bg={TONES[tone].solid} color="text.inverse" px={5} py={4}>
      <Heading as="h3" fontSize="md" fontWeight="semibold">
        {title}
      </Heading>
      <Text mt={1} fontSize="xs" color="whiteAlpha.900">
        {subtitle}
      </Text>
    </Box>
    <List spacing={3} px={5} py={5} styleType="disc" stylePosition="outside" ml={4}>
      {points.map((point) => (
        <ListItem
          key={point}
          fontSize="sm"
          color="text.primary"
          sx={{ "&::marker": { color: tone === "red" ? "red.500" : "navy.800" } }}
        >
          {point}
        </ListItem>
      ))}
    </List>
  </Box>
);

const PipelineStep = ({ title, description, isApproved }) => (
  <Box
    flex={1}
    minW={0}
    p={4}
    bg={isApproved ? "status.success.bg" : "bg.surface"}
    border="1px solid"
    borderColor={isApproved ? "status.success.border" : "border.default"}
    borderRadius="lg"
    boxShadow="card"
  >
    <Text fontSize="sm" fontWeight="semibold" color="navy.800">
      {title}
    </Text>
    <Text mt={1} fontSize="xs" color="text.secondary">
      {description}
    </Text>
  </Box>
);

const RepositoriesSection = () => (
  <AboutSection
    bg="bg.surface"
    title={REPOSITORIES_SECTION.title}
    description={REPOSITORIES_SECTION.description}
  >
    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
      {REPOSITORY_OVERVIEW.map(({ key, ...repo }) => (
        <RepositoryCard key={key} {...repo} />
      ))}
    </SimpleGrid>

    <Flex
      as="ol"
      listStyleType="none"
      aria-label="Review pipeline"
      mt={8}
      direction={{ base: "column", lg: "row" }}
      align="stretch"
      gap={2}
    >
      {REVIEW_PIPELINE.map((step, i) => (
        <Flex
          as="li"
          key={step.title}
          flex={1}
          direction={{ base: "column", lg: "row" }}
          align="stretch"
          gap={2}
        >
          <PipelineStep {...step} />
          {i < REVIEW_PIPELINE.length - 1 && (
            <Icon
              as={FiArrowRight}
              boxSize={4}
              color="navy.800"
              flexShrink={0}
              alignSelf="center"
              transform={{ base: "rotate(90deg)", lg: "none" }}
              aria-hidden="true"
            />
          )}
        </Flex>
      ))}
    </Flex>
  </AboutSection>
);

export default RepositoriesSection;
