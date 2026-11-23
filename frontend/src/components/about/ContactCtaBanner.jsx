// Navy call-to-action band at the bottom of the About page.

import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Button from "../common/Button";
import AboutSection from "./AboutSection";
import { ROUTES } from "../../config/routes";
import { ABOUT_CTA } from "../../config/about";

const ContactCtaBanner = () => (
  <AboutSection>
    <Flex
      bg="navy.800"
      color="text.inverse"
      borderRadius="xl"
      px={{ base: 6, md: 8 }}
      py={{ base: 6, md: 8 }}
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={5}
    >
      <Box>
        <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          {ABOUT_CTA.title}
        </Heading>
        <Text mt={2} fontSize="sm" color="whiteAlpha.900">
          {ABOUT_CTA.description}
        </Text>
      </Box>
      <Button as={RouterLink} to={ROUTES.CONTACT_US} variant="danger" flexShrink={0}>
        {ABOUT_CTA.buttonLabel}
      </Button>
    </Flex>
  </AboutSection>
);

export default ContactCtaBanner;
