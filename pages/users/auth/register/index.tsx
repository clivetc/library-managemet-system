import {
  Box,
  Stack,
  InputGroup,
  Icon,
  Input,
  InputLeftElement,
  InputRightElement,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { useRegisterHandler } from "@/hooks/registerHandler";

const UserRegister = () => {
  const { formikHook, userLoading } = useRegisterHandler();
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
            <Input
              type="text"
              placeholder="UserName"
              onChange={formikHook.handleChange}
              name="name"
            />
            {formikHook.touched.name && formikHook.errors.name ?
              <Box color={'red'}>{formikHook.errors.name}</Box>
              : null}
            <Input
              type="text"
              placeholder="Please Enter First Name"
              onChange={formikHook.handleChange}
              name="firstName"
            />
            {formikHook.touched.firstName && formikHook.errors.firstName ?
              <Box color={'red'}>{formikHook.errors.firstName}</Box>
              : null}
            <Input
              type="text"
              placeholder="Please Enter Last Name"
              onChange={formikHook.handleChange}
              name="lastName"
            />
            {formikHook.touched.lastName && formikHook.errors.lastName ?
              <Box color={'red'}>{formikHook.errors.lastName}</Box>
              : null}
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <Icon as={MdAlternateEmail} color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Please Enter Email"
                onChange={formikHook.handleChange}
                name="email"
              />
            </InputGroup>
            {formikHook.touched.email && formikHook.errors.email ?
              <Box color={'red'}>{formikHook.errors.email}</Box>
              : null}
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
            {formikHook.touched.password && formikHook.errors.password ?
              <Box color={'red'}>{formikHook.errors.password}</Box>
              : null}
            <Button type="submit" colorScheme="purple" isLoading={userLoading}>
              Register
            </Button>
            <Box textAlign={"center"}>
              <Link href="/users/auth/login">Already have an Account</Link>
            </Box>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default UserRegister;
