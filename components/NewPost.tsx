import {
	Box,
	Input,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
	Stack,
	Switch,
	FormControl,
	FormLabel,
	ModalBody,
	Button,
	ModalFooter,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";

interface IProps {
	isOpen: boolean;
	onClose: VoidFunction;
	formikHook: FormikProps<any>;
}

const NewPost = ({ isOpen, onClose, formikHook }: IProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={formikHook.handleSubmit}>
					<ModalBody>
						<Stack spacing={4} p={3}>
							<Box
								display={"flex"}
								flexDirection={"column"}
								justifyContent={"center"}
								alignContent={"center"}
								textAlign={"center"}
							>
								<Text fontSize={"x-large"} fontWeight={"semibold"}>
									Post For Today
								</Text>
							</Box>
							<Input
								placeholder="Write New Pastor's word for the day"
								name="post"
								type="text"
								onChange={formikHook.handleChange}
							/>

							<FormControl display="flex" alignItems="center" mt={"4"}>
								<FormLabel htmlFor="posts" mb="0">
									Enable Post
								</FormLabel>
								<Switch
									id="email-posts"
									onChange={formikHook.handleChange}
									name="enabled"
								/>
							</FormControl>
						</Stack>
					</ModalBody>
					<ModalFooter gap={3}>
						<Button
							type="reset"
							onClick={formikHook.handleReset}
							variant="outline"
						>
							Reset
						</Button>
						<Button type="submit" colorScheme="blue">
							Submit
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default NewPost;
