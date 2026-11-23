// Dark footer for public pages: copyright on the left, site links on the right.

import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../../config/routes";

// Privacy Policy and Terms of Service have no pages yet.
const FOOTER_LINKS = [
  { label: "About", path: ROUTES.ABOUT },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", path: ROUTES.CONTACT_US },
];

const linkStyles = {
  fontSize: "xs",
  color: "neutral.300",
  _hover: { color: "text.inverse", textDecoration: "none" },
  _focusVisible: { boxShadow: "focus", outline: "none" },
};

const PublicFooter = () => (
  <Box as="footer" bg="navy.900">
    <Flex
      maxW="6xl"
      mx="auto"
      px={{ base: "gutter", lg: 6 }}
      py={6}
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={4}
    >
      <Text fontSize="xs" color="neutral.300">
        © {new Date().getFullYear()} S2Tech. All rights reserved.
      </Text>
      <HStack as="nav" aria-label="Footer" spacing={6} wrap="wrap" rowGap={2}>
        {FOOTER_LINKS.map((link) =>
          link.path ? (
            <Link key={link.label} as={RouterLink} to={link.path} {...linkStyles}>
              {link.label}
            </Link>
          ) : (
            <Link key={link.label} href={link.href} {...linkStyles}>
              {link.label}
            </Link>
          )
        )}
      </HStack>
    </Flex>
  </Box>
);

export default PublicFooter;
