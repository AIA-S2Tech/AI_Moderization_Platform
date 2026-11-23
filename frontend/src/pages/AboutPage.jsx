import { Box } from "@chakra-ui/react";
import PublicNav from "../components/public/PublicNav";
import PublicFooter from "../components/public/PublicFooter";
import AboutHero from "../components/about/AboutHero";
import CapabilitiesSection from "../components/about/CapabilitiesSection";
import RepositoriesSection from "../components/about/RepositoriesSection";
import PrinciplesSection from "../components/about/PrinciplesSection";
import AudienceSection from "../components/about/AudienceSection";
import ContactCtaBanner from "../components/about/ContactCtaBanner";

const AboutPage = () => (
  <Box minH="100vh" bg="bg.page" display="flex" flexDirection="column">
    <PublicNav />
    <Box flex={1}>
      <AboutHero />
      <CapabilitiesSection />
      <RepositoriesSection />
      <PrinciplesSection />
      <AudienceSection />
      <ContactCtaBanner />
    </Box>
    <PublicFooter />
  </Box>
);

export default AboutPage;
