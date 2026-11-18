import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { isAuthenticated } from "../utils/auth";

const NotFoundPage = () => {
  const target = isAuthenticated() ? ROUTES.DASHBOARD : ROUTES.SIGN_IN;
  return (
    <Box textAlign="center" py={20} px={4}>
      <Heading as="h1" size="2xl" mb={2}>
        404
      </Heading>
      <Text fontSize="lg" mb={6}>
        The page you are looking for doesn't exist.
      </Text>
      <Button as={RouterLink} to={target}>
        {isAuthenticated() ? "Go to Dashboard" : "Go to Sign In"}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
