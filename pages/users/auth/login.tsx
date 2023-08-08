import {
  Box,
  Stack,
  InputGroup,
  Icon,
  Input,
  InputLeftElement,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAlternateEmail, MdPassword } from "react-icons/md";

const UserLogin = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box h="70vh" bg="purple.400" borderRadius={"10px"}>
      <form>
        <Stack spacing={4}>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <Icon as={<MdAlternateEmail />} color="gray.300" />
            </InputLeftElement>
            <Input type="email" placeholder="Please Enter Email" />
          </InputGroup>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <Icon as={<MdPassword />} color="gray.300" />
            </InputLeftElement>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit">LOGIN</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UserLogin;
