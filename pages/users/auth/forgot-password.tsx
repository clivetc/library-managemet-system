import { useLoginHandler } from "@/hooks/loginHandler";
import {
	Box,
	Button,
	Center,
	Icon,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
} from "@chakra-ui/react";
import { MdAlternateEmail } from "react-icons/md";

const ForgotPass = () => {
	const { formik, isLoading } = useLoginHandler();
	return (
		<Box borderRadius={"10px"} p={3}>
			<Center mb={3}>
				<Image
					src="/static/church_logo.png"
					alt="logo"
					height={100}
					width={100}
				/>
			</Center>
			<form onSubmit={formik.handleSubmit}>
				<Stack spacing={4}>
					<InputGroup size="md">
						<InputLeftElement pointerEvents="none">
							<Icon as={MdAlternateEmail} color="gray.300" />
						</InputLeftElement>
						<Input
							type="email"
							name="email"
							placeholder="Please Enter Email"
							onChange={formik.handleChange}
						/>
					</InputGroup>
					{formik.touched.email && formik.errors.email ? (
						<Box color={"red"}>{formik.errors.email}</Box>
					) : null}
					<Button type="submit" colorScheme="purple" isLoading={isLoading}>
						Submit
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default ForgotPass;
