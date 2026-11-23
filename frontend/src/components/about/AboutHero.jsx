// Navy hero for the About page: intro text + CTAs on the left,
// the "How work flows" card on the right (stacks below on small screens).

import { Box, Flex, Heading, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiArrowDown } from "react-icons/fi";
import Button from "../common/Button";
import { TONES } from "./AboutSection";
import { ROUTES } from "../../config/routes";
import { ABOUT_HERO, WORK_FLOW_STEPS } from "../../config/about";
import { isAuthenticated } from "../../utils/auth";

const WorkFlowCard = () => (
  <Box
    bg="bg.surface"
    borderRadius="xl"
    boxShadow="modal"
    p={{ base: 4, md: 5 }}
    w="100%"
    maxW={{ base: "100%", lg: "md" }}
    flexShrink={0}
  >
    <Text textStyle="sectionTitle" fontSize="xs" color="text.secondary" mb={4}>
      How work flows
    </Text>
    <VStack as="ol" listStyleType="none" spacing={2} align="stretch" m={0}>
      {WORK_FLOW_STEPS.map((step, i) => (
        <Box as="li" key={step.title}>
          <Box bg={TONES[step.tone].solid} color="text.inverse" borderRadius="lg" px={4} py={3}>
            <Text fontSize="sm" fontWeight="semibold">
              {step.title}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.900" mt={1}>
              {step.description}
            </Text>
          </Box>
          {i < WORK_FLOW_STEPS.length - 1 && (
            <Flex justify="center" pt={2} aria-hidden="true">
              <Icon as={FiArrowDown} color="navy.800" boxSize={4} />
            </Flex>
          )}
        </Box>
      ))}
    </VStack>
  </Box>
);

const AboutHero = () => {
  const loggedIn = isAuthenticated();

  return (
    <Box as="section" bgGradient="linear(to-br, navy.800, navy.700)" color="text.inverse">
      <Flex
        maxW="6xl"
        mx="auto"
        px={{ base: "gutter", lg: 6 }}
        py={{ base: 12, md: 16 }}
        direction={{ base: "column", lg: "row" }}
        align={{ base: "stretch", lg: "center" }}
        gap={{ base: 10, lg: 16 }}
      >
        <Stack spacing={5} flex={1}>
          <Text textStyle="sectionTitle" fontSize="xs" color="whiteAlpha.800">
            {ABOUT_HERO.eyebrow}
          </Text>
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" lineHeight="tight">
            {ABOUT_HERO.title}
          </Heading>
          <Text fontSize="md" color="whiteAlpha.900" maxW="xl">
            {ABOUT_HERO.description}
          </Text>
          <HStack spacing={3} pt={2}>
            <Button as={RouterLink} to={ROUTES.CONTACT_US} variant="danger">
              Talk to us
            </Button>
            <Button
              as={RouterLink}
              to={loggedIn ? ROUTES.DASHBOARD : ROUTES.SIGN_IN}
              variant="ghost"
              color="text.inverse"
              borderColor="whiteAlpha.800"
              _hover={{ bg: "whiteAlpha.200" }}
              _active={{ bg: "whiteAlpha.300" }}
            >
              {loggedIn ? "Go to dashboard" : "Sign in"}
            </Button>
          </HStack>
        </Stack>

        <WorkFlowCard />
      </Flex>
    </Box>
  );
};

export default AboutHero;
