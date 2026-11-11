import { Box } from "@chakra-ui/react";
import TopNav from "./TopNav";
import TopNavActions from "./TopNavActions";

const AppShell = ({ children }) => (
  <Box minH="100vh" bg="bg.page">
    <TopNav rightSlot={<TopNavActions />} />
    <Box as="main" maxW="container.page" mx="auto" px={{ base: "gutter", lg: 6 }} py="sectionGap">
      {children}
    </Box>
  </Box>
);

export default AppShell;
