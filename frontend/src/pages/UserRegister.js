import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  VStack,
  SimpleGrid,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast, Text, Link
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const UserRegister = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  console.log(API_URL);
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({ 
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    designation: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.department) newErrors.department = "Select department";
    if (!form.designation) newErrors.designation = "Designation required";

    if (!form.password || form.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRoleFromDepartment = (department) => {
    const roleMap = {
      Manager: "MANAGER",
      HR: "USER",
      IT: "DEVELOPER",
    };

    return roleMap[department] || "USER"; // default fallback
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const payload = {
      email: form.email,
      password: form.password,
      first_name: form.firstName,
      last_name: form.lastName,
      department: form.department,
      designation: form.designation,
      role_name: getRoleFromDepartment(form.department),
    };

    try {
      const response = await fetch(
        // `${import.meta.env.VITE_API_BASE_URL}/register`,
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // Optional: reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        designation: "",
        password: "",
        confirmPassword: "",
        role: "",
      });

    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.400, purple.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box bg="white" p={8} borderRadius="2xl" boxShadow="2xl" maxW="720px" w="full">
        <Heading textAlign="center" mb={8} bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text">
          Create Account
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
              <FormControl isInvalid={errors.firstName}>
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" value={form.firstName} onChange={handleChange} />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input name="lastName" value={form.lastName} onChange={handleChange} />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" value={form.email} onChange={handleChange} />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
              <FormControl isInvalid={errors.department}>
                <FormLabel>Department</FormLabel>
                <Select name="department" value={form.department} onChange={handleChange}>
                  <option value="">Select department</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                </Select>
                <FormErrorMessage>{errors.department}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.designation}>
                <FormLabel>Designation</FormLabel>
                <Input name="designation" value={form.designation} onChange={handleChange} />
                <FormErrorMessage>{errors.designation}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <Button type="submit" size="lg" w="full" colorScheme="purple" isLoading={loading}>
              Register
            </Button>
          </VStack>
          <Text color="black" fontSize="sm" align="center" pt={2}>
            Already have an account? <Link color="blue" href="/sign-in">Sign In</Link>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default UserRegister;
