// "Five capabilities, one connected method" – one row per methodology workspace.

import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import AboutSection, { NumberCircle, TONES } from "./AboutSection";
import { CAPABILITIES, CAPABILITIES_SECTION } from "../../config/about";

const CapabilitiesSection = () => (
  <AboutSection title={CAPABILITIES_SECTION.title} description={CAPABILITIES_SECTION.description}>
    <VStack as="ol" listStyleType="none" spacing={4} align="stretch" m={0}>
      {CAPABILITIES.map((cap) => (
        <Flex
          as="li"
          key={cap.key}
          gap={{ base: 4, md: 5 }}
          p={{ base: 4, md: 6 }}
          bg={TONES[cap.tone].tint}
          border="1px solid"
          borderColor={TONES[cap.tone].border}
          borderRadius="lg"
          boxShadow="card"
        >
          <NumberCircle tone={cap.tone}>{cap.step}</NumberCircle>
          <Box minW={0}>
            <Heading
              as="h3"
              fontSize="md"
              fontWeight="bold"
              color="navy.800"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              {cap.label}
            </Heading>
            <Text mt={1} fontSize="sm" color="text.primary">
              {cap.summary}
            </Text>
            <Text mt={2} fontSize="xs" color="text.secondary">
              <Text as="span" fontWeight="semibold" color="text.primary">
                Typical outputs:
              </Text>{" "}
              {cap.outputs}
            </Text>
          </Box>
        </Flex>
      ))}
    </VStack>
  </AboutSection>
);

export default CapabilitiesSection;
