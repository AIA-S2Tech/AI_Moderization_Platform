// "Who uses it" – three role cards with a navy / red top accent.

import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import AboutSection, { TONES } from "./AboutSection";
import { AUDIENCES } from "../../config/about";

const AudienceSection = () => (
  <AboutSection bg="bg.surface" title={AUDIENCES.title}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
      {AUDIENCES.items.map((audience) => (
        <Box
          key={audience.title}
          p={5}
          bg="bg.surface"
          border="1px solid"
          borderColor="border.default"
          borderTop="3px solid"
          borderTopColor={TONES[audience.tone].solid}
          borderRadius="lg"
          boxShadow="card"
        >
          <Heading as="h3" fontSize="md" fontWeight="semibold" color="navy.800">
            {audience.title}
          </Heading>
          <Text mt={2} fontSize="sm" color="text.secondary">
            {audience.description}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  </AboutSection>
);

export default AudienceSection;
