import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

const SignIn = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error state
  const [errors, setErrors] = useState({});

  // Helper to validate email
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    login(email, password);
  };

  return (
    <Flex direction="column" justify="space-between">
      <Box as="main" flex="1" px={6} py={8}>
        <VStack spacing={6} maxW="400px" mx="auto" w="100%">
          <Text as={'h2'} textAlign="center" fontSize={'24px'} fontWeight={'600'} width={{base:'100%', md:'600px', lg:'800px'}}>
            Welcome to AI Accelerator
          </Text>
          <Text fontSize="md" fontWeight={'600'} py="7px" textAlign="center" bg="#c6ccd5" width={{base:'100%', md:'600px', lg:'800px'}} borderRadius={'10px'}>
            {/* TODO: keep many tagline in json dsts and use js to randon display */}
            Sign in to continue your modernization journey with the S2Tech Modernization Platform.
          </Text>

          {/* Login Form */}
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="blue"
            w="60%"
            onClick={handleLogin}
            isDisabled={!email || !password}
          >
            Login
          </Button>

          <Link color="black" href="/forgot-password" fontSize="sm" alignSelf="center">
            Having trouble signing in?
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignIn;