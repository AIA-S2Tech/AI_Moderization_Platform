import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  FormControl,
  FormLabel,
  Container,
  Input,
  Button,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import styles from "../assets/css/ForgotPassword.module.css"

const ForgotPassword = () => {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    // Get user-entered input from the input field
    const email = e.target.value;
    setEmail(email); // Update state with user input
    if (email && isValidEmail(email)) {
      // Checks entered input is valid email or not
      setIsError(false);
      setErrorMessage("");
    }
  };
  const isValidEmail = (email) => {
    //logic for valid-email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const forgotpassword = async () => {
    if (!email) {
      setIsError(true);
      setErrorMessage("Please enter your email address."); //if user-input is empty then it will show the error
      return;
    }

    if (!isValidEmail(email)) {
      setIsError(true);
      setErrorMessage("Please enter a valid email address."); //if user-input is not valid then it will show the error
      return;
    }

    setIsError(false);
    setErrorMessage("");
    alert(`send reset instructions to your ${email}`); //if user-input is valid then it will show the alert
  };

  return (
    <>
      <Box justifyContent="center" align="center" mb={8}>
        <Text fontWeight="700" fontSize="30px" mb="2">
          Forgot Password?
        </Text>
        <Text>
          Enter your registered email address and we will send you instructions
          to reset
          <br />
          your password.
        </Text>
        <Container maxW="sm" mt={4}>
          <FormControl isInvalid={isError} isRequired>
            <FormLabel htmlFor="email" fontSize="sm" fontWeight="medium">
              Email:
            </FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              className={styles.inputcustom}
              onChange={handleChange}
            />
            {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
          </FormControl>
        </Container>
        <Button
          onClick={forgotpassword}
          mt={3}
          mb={4}
          colorScheme="blue"
          fontWeight="400"
        >
          Reset Password
        </Button>
        <Text>Remember your password? </Text>
        <Flex justifyContent="center" p={4}>
          <Link color="blue" href="/sign-in">Login</Link>
        </Flex>
      </Box>
    </>
  );
};

export default ForgotPassword;
