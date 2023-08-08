import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={6}>
      <Flex justify="center" align="center">
        <Text>&copy; 2023 Your Company. All rights reserved.</Text>
      </Flex>
      <Flex justify="center" align="center" mt={2}>
        <Link href="#">Privacy Policy</Link>
        <Text mx={2}>|</Text>
        <Link href="#">Terms of Service</Link>
      </Flex>
    </Box>
  );
};

export default Footer;
