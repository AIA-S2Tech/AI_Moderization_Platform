
import { Box, Heading, Text } from "@chakra-ui/react";

const PlaceholderPage = ({ title }) => (
  <Box p={6}>
    <Heading as="h1" size="lg" mb={2}>
      {title}
    </Heading>
    <Text color="text.muted">This page is under construction.</Text>
  </Box>
);

export default PlaceholderPage;
