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
import Link from "next/link";
import React, { useState } from "react";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import Image from "next/image";
import { useLoginHandler } from "@/hooks/loginHandler";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserLogin = () => {
	const { formikHook, userLoading } = useLoginHandler();
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const isAdmin = useSelector((state: RootState) => state.auth.user?.isAdmin);

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
								name="email"
								placeholder="Please Enter Email"
								onChange={formikHook.handleChange}
							/>
						</InputGroup>
						{formikHook.touched.email && formikHook.errors.email ? (
							<Box color={"red"}>{formikHook.errors.email}</Box>
						) : null}
						<InputGroup size="md">
							<InputLeftElement pointerEvents="none">
								<Icon as={MdPassword} color="gray.300" />
							</InputLeftElement>
							<Input
								pr="4.5rem"
								type={show ? "text" : "password"}
								placeholder="Enter password"
								name="password"
								onChange={formikHook.handleChange}
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
						{formikHook.touched.password && formikHook.errors.password ? (
							<Box color={"red"}>{formikHook.errors.password}</Box>
						) : null}
						<Button type="submit" colorScheme="purple" isLoading={userLoading}>
							LOGIN
						</Button>

						<Box textAlign={"center"}>
							<Link href="/users/auth/register">Do not have an Account</Link>
						</Box>
					</Stack>
				</form>
			</Flex>
		</Box>
	);
};

export default UserLogin;
