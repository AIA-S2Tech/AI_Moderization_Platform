import React from "react";
import { Box, Flex, Image, Link, Divider } from "@chakra-ui/react";
import { isAuthenticated } from "../../utils/auth" 
import SmartHireAILogo from "../../assets/img/ai-accelerator-logo.svg";
import S2TechLogo from "../../assets/img/s2tech.svg";


const Header = () => {
  const loggedIn = isAuthenticated();

  if (!loggedIn) {
    // Show just logos if NOT logged in
    return (
      <Box as="header" w="100%" py={2} px={4}>
        <Flex justify="center" align="center" mb={2}>
          <Image
            src={SmartHireAILogo}
            alt="SmartHireAI Logo"
            h="60px"
          />
        </Flex>
        <Divider borderBottomWidth={'2px'}/>
        <Flex justify="flex-end" align="center" m={'10px 30px 0 0'}>
          <Link target="_blank" href="https://s2tech.com/" _hover={'pointer'}>
            <Image
              src={S2TechLogo}
              alt="S2Tech Logo"
              h="50px"
            />
          </Link>
        </Flex>
      </Box>
    );
  }
};

export default Header;