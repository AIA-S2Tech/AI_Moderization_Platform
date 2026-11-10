import { Box, VStack, HStack, Text, Link, Divider } from "@chakra-ui/react";
import { isAuthenticated } from "../../utils/auth"
const Footer = () => {
  const loggedIn = isAuthenticated();

  return (
    <Box
      as="footer"
      py={4}
      pl={{ base: 6, md: loggedIn ? "232px" : 6 }}
      pr={6}
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
    >
      <VStack spacing={2} textAlign="center">
        <Text fontSize="16px" fontWeight="600">
          © SEVEN SEAS TECHNOLOGIES INC {new Date().getFullYear()}
        </Text>
        <Divider borderBottomWidth="2px" />
        <HStack
          spacing={4}
          justify="center"
          wrap="wrap"
          fontWeight="600"
          color="black"
        >
          <Link href="#" fontSize="sm">
            About AI Accelerator
          </Link>
          <Link href="/contact-us" fontSize="sm">
            Contact Us
          </Link>
          <Link href="#" fontSize="sm">
            Privacy Policy
          </Link>
          <Link href="#" fontSize="sm">
            Terms of Service
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Footer;