import { Box } from "@chakra-ui/react";
import TopNav from "./TopNav";
import TopNavActions from "./TopNavActions";
import Breadcrumb from "./Breadcrumb";

const AppShell = ({ children }) => (
  <Box minH="100vh" bg="bg.page">
    <TopNav rightSlot={<TopNavActions />} />
    <Box as="main" maxW="container.page" mx="auto" px={{ base: "gutter", lg: 6 }} py="sectionGap">
      {/* breadcrumb for every private page, generated from the route config */}
      <Breadcrumb mb={4} />
      {children}
    </Box>
  </Box>
);

export default AppShell;
