import {
  Container,
  FormControl,
  FormLabel,
  Image,
  Text,
  Textarea,
  Input,
  Box,
  Flex,
  Button,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../assets/css/ContactUs.module.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /// Get user-entered input from the input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "message") setMessage(value);
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      //checks all filed are filled or not
      setIsError(true);
      setErrorMessage("Please fill out all fields before submitting."); //shows error when all fields are not filled

      setTimeout(() => {
        setIsError(false);
        setErrorMessage(""); //display error message for 2s only
      }, 2000);

      return;
    }

    // All fields valid
    setIsError(false);
    setErrorMessage("");
    // console.log("Submitted:", { name, email, message });
    alert(`Your message has been sent successfully.`);
  };

  return (
    <>
      <Box justifyContent="center" align="center">
        <Text fontWeight="700" fontSize="30px" mb="2">
          Contact Us
        </Text>
        <Text>
          Have Questions or Feedback? Send us a message and our
          <br />
          team will get back to you as soon as possible.
        </Text>

        <Container maxW="sm" mt={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="name" className={styles.formlabelcustom}>
              Name:
            </FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className={styles.inputCustom}
              value={name}
              onChange={handleInputChange}
            />

            <FormLabel htmlFor="email" className={styles.formlabelcustom}>
              Email:
            </FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className={styles.inputCustom}
              value={email}
              onChange={handleInputChange}
            />

            <FormLabel htmlFor="message" className={styles.formlabelcustom}>
              Message:
            </FormLabel>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Enter your message"
              className={styles.inputCustom}
              value={message}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            width={'60%'}
            fontWeight={'400'}
          >
            Send Message
          </Button>

          {isError && (
            <Text color="red.500" textAlign="center" mb={4}>
              {errorMessage}
            </Text>
          )}

          <Flex justifyContent="center" p={4}>
            <Link href="/sign-in" color="blue">Login</Link>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default ContactUs;
