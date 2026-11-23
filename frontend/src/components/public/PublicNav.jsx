// Top bar for public (signed-out) pages: S2Tech logo + app title on the left,
// About / Contact Us links and a Sign In button on the right.
// Signed-in visitors get a "Dashboard" button instead of "Sign In".

import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import S2TechLogo from "../../assets/img/s2tech-wordmark.svg";
import Button from "../common/Button";
import { ROUTES } from "../../config/routes";
import { APP_TITLE } from "../../config/navigation";
import { isAuthenticated } from "../../utils/auth";

const PUBLIC_NAV_LINKS = [
  { label: "About", path: ROUTES.ABOUT },
  { label: "Contact Us", path: ROUTES.CONTACT_US },
];

const NavItem = ({ label, path }) => (
  <Link
    as={NavLink}
    to={path}
    end
    fontSize="sm"
    fontWeight="medium"
    color="brand.primary"
    py={1}
    borderBottom="2px solid"
    borderBottomColor="transparent"
    _hover={{ textDecoration: "none", color: "navy.600" }}
    _activeLink={{ fontWeight: "semibold", borderBottomColor: "brand.accent" }}
    _focusVisible={{ boxShadow: "focus", outline: "none" }}
  >
    {label}
  </Link>
);

const PublicNav = () => {
  const loggedIn = isAuthenticated();

  return (
    <Box as="header" bg="bg.surface" borderBottom="1px solid" borderColor="border.default">
      <Flex
        maxW="6xl"
        mx="auto"
        px={{ base: "gutter", lg: 6 }}
        h="navHeight"
        align="center"
        justify="space-between"
        gap={4}
      >
        <Flex as={RouterLink} to={ROUTES.ABOUT} align="center" gap={3} minW={0}>
          {/* Logo asset is black – use it as a mask so it renders in brand navy */}
          <Box
            role="img"
            aria-label="S2Tech"
            h="24px"
            w="98px" // keeps the asset's 697 × 170 ratio
            flexShrink={0}
            bg="brand.primary"
            sx={{
              maskImage: `url(${S2TechLogo})`,
              WebkitMaskImage: `url(${S2TechLogo})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
          <Text
            display={{ base: "none", md: "block" }}
            fontSize="sm"
            fontWeight="semibold"
            color="brand.primary"
            whiteSpace="nowrap"
          >
            {APP_TITLE}
          </Text>
        </Flex>

        <HStack as="nav" aria-label="Public" spacing={{ base: 3, md: 6 }} flexShrink={0}>
          {PUBLIC_NAV_LINKS.map((link) => (
            <NavItem key={link.path} {...link} />
          ))}
          <Button as={RouterLink} to={loggedIn ? ROUTES.DASHBOARD : ROUTES.SIGN_IN}>
            {loggedIn ? "Dashboard" : "Sign In"}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default PublicNav;
