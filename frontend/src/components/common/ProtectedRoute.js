import React from 'react';
import { Navigate } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import { isAuthenticated } from '../../utils/auth';
import SideNav from "./SideNavBar";
import IdleTimeHandler from "./idleTimeHandler";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" replace />;
  }
  return (
    <Flex height="100%">
      {/* Sidebar with fixed width */}
      <IdleTimeHandler />
      <Box width={{md:"200px"}}>
        <SideNav />
      </Box>
      {/* <Box flex="1" p={6} overflowY="auto" mt={"30px"}> */}
      <Box flex="1" p={{base:"65px 10px 10px 10px" , sm:6}} overflowY="auto">
        {children}
      </Box>
    </Flex>
  );
};

export default ProtectedRoute;
