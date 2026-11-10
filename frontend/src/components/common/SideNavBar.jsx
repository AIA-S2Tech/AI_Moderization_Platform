import {
  Box,
  Text,
  VStack,
  Flex,
  Icon,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiBriefcase,
  FiUsers,
  FiLink,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import { logout } from "../../utils/auth";
import SmartHireAILogo from "../../assets/img/s2tech-logo.svg";

const navItems = [
  { label: "Profile", icon: FiUser, path: "/me" },
  { label: "Jobs", icon: FiBriefcase, path: "/dashboard/job", slugparent: "job" },
  { label: "Candidates", icon: FiUsers, path: "/dashboard/candidate", slugparent: "candidate" },
  { label: "Recruitment", icon: FiLink, path: "/dashboard/recruitment", slugparent: "recruitment" },
  { label: "Settings", icon: FiSettings, path: "/settings" },
  { label: "Help", icon: FiHelpCircle, path: "/help" },
];

const userInfo = JSON.parse(localStorage.getItem("user"));

function SideNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarBg = useColorModeValue(
    "linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%)",
    "linear-gradient(180deg, #0f172a 0%, #020617 100%)"
  );

  const itemBg = useColorModeValue("white", "gray.800");
  const activeBg = useColorModeValue("blue.500", "blue.400");
  const hoverBg = useColorModeValue("blue.50", "gray.700");

  const isActive = (path, slugparent = null) => {
    if (location.pathname === path) return true;
    if (slugparent && location.pathname.startsWith(`/${slugparent}/`)) return true;
    return false;
  };

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
  };

  const NavItem = ({ item, isMobile = false }) => (
    <Flex
      align="center"
      gap={3}
      px={4}
      py={isMobile ? 4 : 3}
      rounded="xl"
      cursor="pointer"
      bg={isActive(item.path, item.slugparent) ? activeBg : itemBg}
      color={isActive(item.path, item.slugparent) ? "white" : "gray.700"}
      fontWeight="medium"
      boxShadow={
        isActive(item.path, item.slugparent)
          ? "0 10px 25px rgba(59,130,246,0.3)"
          : "sm"
      }
      _hover={{
        transform: "translateX(4px)",
        bg: isActive(item.path, item.slugparent) ? activeBg : hoverBg,
      }}
      transition="all 0.25s ease"
      onClick={() => handleNavigate(item.path)}
    >
      <Flex
        align="center"
        justify="center"
        w="40px"
        h="40px"
        rounded="lg"
        bg={isActive(item.path, item.slugparent) ? "whiteAlpha.300" : "blue.50"}
      >
        <Icon
          as={item.icon}
          boxSize={5}
          color={isActive(item.path, item.slugparent) ? "white" : "blue.500"}
        />
      </Flex>

      <Text fontSize="sm">
        {item.label === "Profile"
          ? userInfo?.user?.profile?.first_name || "Profile"
          : item.label}
      </Text>
    </Flex>
  );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <Box
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w="220px"
        bg={sidebarBg}
        borderRight="1px solid"
        borderColor="gray.200"
        px={4}
        py={6}
        backdropFilter="blur(10px)"
        zIndex={100}
      >
        {/* Logo */}
        <Flex align="center" mb={10}>
          <Link href="/">
            <Box as="img" src={SmartHireAILogo} alt="SmartHireAI" w="160px" />
          </Link>
        </Flex>

        {/* Nav Items */}
        <VStack align="stretch" spacing={3} flex={1}>
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </VStack>

        {/* Logout */}
        <Flex
          mt={4}
          align="center"
          gap={3}
          px={4}
          py={3}
          rounded="xl"
          bg="red.50"
          color="red.600"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ bg: "red.100" }}
          onClick={handleLogout}
        >
          <Icon as={FiLogOut} boxSize={5} />
          <Text fontSize="sm">Logout</Text>
        </Flex>
      </Box>

      {/* ================= MOBILE TOP BAR ================= */}
      <Flex
        display={{ base: "flex", md: "none" }}
        align="center"
        justify="space-between"
        px={4}
        py={3}
        position="fixed"
        top={0}
        w="100%"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        zIndex={1000}
      >
        <Link href="/">
          <Box as="img" src={SmartHireAILogo} alt="SmartHireAI" w="150px" />
        </Link>
        <IconButton
          icon={<HamburgerIcon />}
          variant="ghost"
          aria-label="Open menu"
          onClick={onOpen}
        />
      </Flex>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={sidebarBg}>
          <DrawerCloseButton />
          <DrawerBody mt={12}>
            <VStack align="stretch" spacing={4}>
              {navItems.map((item) => (
                <NavItem key={item.path} item={item} isMobile />
              ))}

              {/* Logout */}
              <Flex
                mt={4}
                align="center"
                gap={3}
                px={4}
                py={4}
                rounded="xl"
                bg="red.50"
                color="red.600"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ bg: "red.100" }}
                onClick={handleLogout}
              >
                <Icon as={FiLogOut} boxSize={5} />
                <Text>Logout</Text>
              </Flex>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideNav;
