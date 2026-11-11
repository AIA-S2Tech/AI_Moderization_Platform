import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiBell,FiHelpCircle, FiLogOut, FiSearch, FiUser } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { logout } from "../../utils/auth";
import { getNotifications, getUnreadCount } from "../../services/notificationService";

const iconButtonStyles = {
  variant: "ghost",
  color: "text.inverse",
  borderRadius: "full",
  _hover: { bg: "whiteAlpha.200" },
  _active: { bg: "whiteAlpha.300" },
  _focusVisible: { boxShadow: "focus" },
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"))?.user || null;
  } catch {
    return null;
  }
};

const getDisplayName = (user) => {
  const first = user?.profile?.first_name || "";
  const last = user?.profile?.last_name || "";
  return `${first} ${last}`.trim() || user?.email || "User";
};

// ---------- Global search ----------
const SearchField = ({ autoFocus = false, onDone }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(q)}`);
    onDone?.();
  };

  return (
    <Box as="form" role="search" onSubmit={handleSubmit} w="full">
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} color="text.muted" />
        </InputLeftElement>
        <Input
          type="search"
          aria-label="Search the platform"
          placeholder="Search artifacts, evidence, rules…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus={autoFocus}
          bg="bg.surface"
          color="text.primary"
          borderRadius="md"
          borderColor="border.default"
        />
      </InputGroup>
    </Box>
  );
};

const GlobalSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* 1024px and up: always-visible search box */}
      <Box display={{ base: "none", lg: "block" }} w="240px">
        <SearchField />
      </Box>

      {/* Smaller screens: search icon that opens the box in a popover */}
      <Box display={{ base: "block", lg: "none" }}>
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-end" isLazy>
          <PopoverTrigger>
            <IconButton aria-label="Search" icon={<Icon as={FiSearch} boxSize={5} />} {...iconButtonStyles} />
          </PopoverTrigger>
          <PopoverContent w={{ base: "calc(100vw - 32px)", sm: "320px" }} boxShadow="dropdown" zIndex="dropdown">
            <PopoverBody>
              <SearchField autoFocus onDone={onClose} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
};

// ---------- Help ----------
const HelpButton = () => (
  <IconButton
    as={RouterLink}
    to={ROUTES.HELP}
    aria-label="Help"
    icon={<Icon as={FiHelpCircle} boxSize={5} />}
    display={{ base: "none", md: "inline-flex" }}
    {...iconButtonStyles}
  />
);

// ---------- Notification bell ----------
const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let active = true;
    getNotifications()
      .then((list) => active && setNotifications(list))
      .catch(() => active && setNotifications([]));
    return () => {
      active = false;
    };
  }, []);

  const unread = getUnreadCount(notifications);
  const label = unread > 0 ? `Notifications, ${unread} unread` : "Notifications";

  return (
    <Menu placement="bottom-end" isLazy>
      <Box position="relative">
        <MenuButton as={IconButton} aria-label={label} icon={<Icon as={FiBell} boxSize={5} />} {...iconButtonStyles} />
        {unread > 0 && (
          <Flex
            position="absolute"
            top="4px"
            right="4px"
            minW="18px"
            h="18px"
            px={1}
            align="center"
            justify="center"
            borderRadius="full"
            bg="brand.accent"
            color="text.inverse"
            fontSize="2xs"
            fontWeight="bold"
            pointerEvents="none"
            aria-hidden="true"
          >
            {unread > 9 ? "9+" : unread}
          </Flex>
        )}
      </Box>
      <MenuList zIndex="dropdown" boxShadow="dropdown" w="320px" py={1}>
        <MenuGroup title="Notifications" color="text.primary">
          {notifications.length === 0 ? (
            <Text px={3} py={2} fontSize="sm" color="text.muted">
              You're all caught up.
            </Text>
          ) : (
            notifications.map((n) => (
              <MenuItem key={n.id} alignItems="flex-start" bg={n.read ? "transparent" : "bg.navTint"}>
                <Box>
                  <Text fontSize="sm" fontWeight={n.read ? "normal" : "semibold"} color="text.primary">
                    {n.title}
                  </Text>
                  <Text fontSize="xs" color="text.secondary">
                    {n.message}
                  </Text>
                </Box>
              </MenuItem>
            ))
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

// ---------- Avatar menu ----------
const UserMenu = () => {
  const user = getStoredUser();
  const name = getDisplayName(user);

  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton
        aria-label={`Account menu for ${name}`}
        borderRadius="full"
        pr={{ base: 0, lg: 2 }}
        _hover={{ bg: "whiteAlpha.100" }}
        _focusVisible={{ boxShadow: "focus" }}
      >
        <Flex align="center" gap={2}>
          <Avatar name={name} size="sm" bg="bg.surface" color="brand.primary" fontWeight="bold" />
          {/* Name + chevron from 1024px up; avatar only on smaller screens */}
          <Text
            display={{ base: "none", lg: "block" }}
            fontSize="sm"
            fontWeight="semibold"
            color="text.inverse"
            maxW="160px"
            noOfLines={1}
          >
            {name}
          </Text>
          <ChevronDownIcon display={{ base: "none", lg: "block" }} color="text.inverse" />
        </Flex>
      </MenuButton>
      <MenuList zIndex="dropdown" boxShadow="dropdown" minW="220px" py={1}>
        <Box px={3} py={2}>
          <Text fontSize="sm" fontWeight="semibold" color="text.primary" noOfLines={1}>
            {name}
          </Text>
          {user?.email && (
            <Text fontSize="xs" color="text.muted" noOfLines={1}>
              {user.email}
            </Text>
          )}
        </Box>
        <MenuDivider />
        <MenuItem as={RouterLink} to={ROUTES.PROFILE} icon={<Icon as={FiUser} />} fontSize="sm">
          Profile
        </MenuItem>
        <MenuItem onClick={logout} icon={<Icon as={FiLogOut} />} fontSize="sm" color="text.alert">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const TopNavActions = () => (
  <Flex align="center" gap={{ base: 1, md: 2 }}>
    <GlobalSearch />
    <NotificationBell />
    <HelpButton />
    <UserMenu />
  </Flex>
);

export default TopNavActions;
