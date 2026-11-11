import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import S2TechLogo from "../../assets/img/s2tech-logo.svg";
import { ROUTES } from "../../config/routes";
import { APP_TITLE, TOP_NAV_ITEMS, isNavItemActive } from "../../config/navigation";

// Shared look for a top-level menu item (link or dropdown trigger) in row 2.
const navItemStyles = (isActive) => ({
  h: "12",
  px: 4,
  display: "flex",
  alignItems: "center",
  gap: 2,
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.inverse",
  bg: isActive ? "whiteAlpha.200" : "transparent",
  borderBottom: "3px solid",
  borderBottomColor: isActive ? "brand.accent" : "transparent",
  borderRadius: "none",
  _hover: { bg: "whiteAlpha.100", textDecoration: "none" },
  _active: { bg: "whiteAlpha.200" },
  _focusVisible: { boxShadow: "focus" },
});

const DesktopDropdown = ({ item, isActive }) => (
  <Menu placement="bottom-start" isLazy>
    <MenuButton
      as={Button}
      variant="unstyled"
      leftIcon={item.icon ? <Icon as={item.icon} boxSize={4} /> : undefined}
      rightIcon={<ChevronDownIcon />}
      aria-current={isActive ? "page" : undefined}
      {...navItemStyles(isActive)}
    >
      {item.label}
    </MenuButton>
    <MenuList
      zIndex="dropdown"
      boxShadow="dropdown"
      borderColor="border.default"
      py={1}
      minW="260px"
    >
      {item.children.map((child) => (
        <MenuItem
          key={child.key}
          as={NavLink}
          to={child.path}
          fontSize="sm"
          color="text.primary"
          _activeLink={{ bg: "bg.navTint", fontWeight: "semibold" }}
        >
          {child.label}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

const DesktopMenu = ({ pathname }) => (
  <Flex as="ul" listStyleType="none" h="full">
    {TOP_NAV_ITEMS.map((item) => {
      const isActive = isNavItemActive(item, pathname);
      return (
        <Box as="li" key={item.key}>
          {item.type === "dropdown" ? (
            <DesktopDropdown item={item} isActive={isActive} />
          ) : (
            <Box
              as={RouterLink}
              to={item.path}
              aria-current={isActive ? "page" : undefined}
              {...navItemStyles(isActive)}
            >
              {item.icon && <Icon as={item.icon} boxSize={4} />}
              {item.label}
            </Box>
          )}
        </Box>
      );
    })}
  </Flex>
);

const MobileLink = ({ label, path, icon, isActive, onClick, indent = false }) => (
  <Flex
    as={RouterLink}
    to={path}
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
    align="center"
    gap={3}
    px={4}
    pl={indent ? 8 : 4}
    py={3}
    borderRadius="md"
    fontSize="sm"
    fontWeight={isActive ? "semibold" : "medium"}
    color={isActive ? "brand.primary" : "text.primary"}
    bg={isActive ? "bg.navTint" : "transparent"}
    _hover={{ bg: "bg.subtle", textDecoration: "none" }}
  >
    {icon && <Icon as={icon} boxSize={4} />}
    {label}
  </Flex>
);

const MobileMenu = ({ isOpen, onClose, pathname }) => (
  <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton color="text.inverse" />
      <DrawerHeader bg="brand.primary" color="text.inverse" fontSize="md">
        {APP_TITLE}
      </DrawerHeader>
      <DrawerBody px={2} py={4}>
        <VStack as="nav" aria-label="Main" align="stretch" spacing={1}>
          {TOP_NAV_ITEMS.map((item) =>
            item.type === "dropdown" ? (
              <Box key={item.key} pt={2}>
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={2}
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="text.muted"
                >
                  {item.icon && <Icon as={item.icon} boxSize={4} />}
                  {item.label}
                </Flex>
                {item.children.map((child) => (
                  <MobileLink
                    key={child.key}
                    label={child.label}
                    path={child.path}
                    isActive={pathname === child.path || pathname.startsWith(`${child.path}/`)}
                    onClick={onClose}
                    indent
                  />
                ))}
              </Box>
            ) : (
              <MobileLink
                key={item.key}
                label={item.label}
                path={item.path}
                icon={item.icon}
                isActive={isNavItemActive(item, pathname)}
                onClick={onClose}
              />
            )
          )}
        </VStack>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);

const TopNav = ({ rightSlot = null }) => {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="nav"
      bg="brand.primary"
      color="text.inverse"
      boxShadow="card"
    >
      {/* Row 1 – brand + actions */}
      <Flex
        h="navHeight"
        maxW="container.page"
        mx="auto"
        px={{ base: "gutter", lg: 6 }}
        align="center"
        gap={{ base: 2, lg: 6 }}
      >
        {/* Hamburger – below 1024px */}
        <IconButton
          display={{ base: "inline-flex", lg: "none" }}
          icon={<HamburgerIcon boxSize={5} />}
          aria-label="Open menu"
          variant="ghost"
          color="text.inverse"
          _hover={{ bg: "whiteAlpha.200" }}
          onClick={onOpen}
        />

        <Flex
          as={RouterLink}
          to={ROUTES.DASHBOARD}
          align="center"
          gap={3}
          flexShrink={0}
          _hover={{ textDecoration: "none" }}
        >
          {/* Logo asset is black – render it white on the navy bar */}
          <Image src={S2TechLogo} alt="S2Tech" h="28px" filter="brightness(0) invert(1)" />
          <Text
            display={{ base: "none", md: "block" }}
            fontSize="md"
            fontWeight="semibold"
            color="text.inverse"
            whiteSpace="nowrap"
          >
            {APP_TITLE}
          </Text>
        </Flex>

        <Box flex={1} />

        {/* T-40: search, help, bell, avatar */}
        <Flex align="center" gap={2} flexShrink={0}>
          {rightSlot}
        </Flex>
      </Flex>

      {/* Row 2 – menu (1024px and up) */}
      <Box
        as="nav"
        aria-label="Main"
        display={{ base: "none", lg: "block" }}
        borderTop="1px solid"
        borderTopColor="whiteAlpha.200"
      >
        <Box maxW="container.page" mx="auto" px={6}>
          <DesktopMenu pathname={pathname} />
        </Box>
      </Box>

      <MobileMenu isOpen={isOpen} onClose={onClose} pathname={pathname} />
    </Box>
  );
};

export default TopNav;
