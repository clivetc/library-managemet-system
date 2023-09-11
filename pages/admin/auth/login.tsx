import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import Image from "next/image";
import { useAdminLoginHandler } from "@/hooks/adminLoginHandler";

const AdminLogin = () => {
  const { formikHook, userLoading } = useAdminLoginHandler();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box borderRadius={"10px"} p={3}>
      <Flex flexDirection={"column"} alignItems={"center"} columnGap={5}>
        <Box mb={3}>
          <Image
            src="/static/church_logo.png"
            alt="logo"
            height={100}
            width={100}
          />
        </Box>
        <form onSubmit={formikHook.handleSubmit}>
          <Stack spacing={4}>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <Icon as={MdAlternateEmail} color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Please Enter Email"
                name="username"
                onChange={formikHook.handleChange}
              />
            </InputGroup>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <Icon as={MdPassword} color="gray.300" />
              </InputLeftElement>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={formikHook.handleChange}
                name="password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit" colorScheme="purple" isLoading={userLoading}>
              LOGIN
            </Button>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default AdminLogin;
