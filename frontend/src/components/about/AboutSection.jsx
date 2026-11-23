// Layout shared by the About page sections: full-width band (white or page
// grey) with a centred content column and an optional heading + intro text.

import { Box, Heading, Text } from "@chakra-ui/react";

// Header colours for the navy / red tone used across the About page.
export const TONES = {
  navy: { solid: "navy.800", tint: "bg.surface", border: "border.default" },
  red: { solid: "red.500", tint: "bg.redTint", border: "border.red" },
};

export const NumberCircle = ({ children, tone = "navy", size = 9, fontSize = "md" }) => (
  <Box
    flexShrink={0}
    w={size}
    h={size}
    borderRadius="full"
    bg={TONES[tone].solid}
    color="text.inverse"
    fontSize={fontSize}
    fontWeight="bold"
    display="flex"
    alignItems="center"
    justifyContent="center"
    aria-hidden="true"
  >
    {children}
  </Box>
);

const AboutSection = ({ title, description, bg = "bg.page", children, ...rest }) => (
  <Box as="section" bg={bg} borderTop="1px solid" borderColor="border.default" {...rest}>
    <Box maxW="6xl" mx="auto" px={{ base: "gutter", lg: 6 }} py={{ base: 10, md: 16 }}>
      {title && (
        <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="navy.800" maxW="2xl" lineHeight="tight">
          {title}
        </Heading>
      )}
      {description && (
        <Text mt={3} fontSize="md" color="text.secondary" maxW="2xl">
          {description}
        </Text>
      )}
      <Box mt={title || description ? 8 : 0}>{children}</Box>
    </Box>
  </Box>
);

export default AboutSection;
