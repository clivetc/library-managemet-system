import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Stack,
	Box,
	Text,
	Input,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";

interface IValues {
	title: string;
	description: string;
	category: string;
	date: string;
}

interface IProps {
	isOpen: boolean;
	onClose: VoidFunction;
	formikHook: FormikProps<IValues>;
	isLoading: boolean;
}
const AnnouncementsModal = ({
	isOpen,
	onClose,
	formikHook,
	isLoading,
}: IProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
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
									Add Church Announcements
								</Text>
							</Box>
							<Input
								placeholder="Title"
								name="title"
								type="text"
								onChange={formikHook.handleChange}
							/>
							{formikHook.touched.title && formikHook.errors.title ? (
								<Box color={"red"}>{formikHook.errors.title}</Box>
							) : null}

							<Input
								placeholder="Category"
								name="category"
								type="text"
								onChange={formikHook.handleChange}
							/>
							{formikHook.touched.category && formikHook.errors.category ? (
								<Box color={"red"}>{formikHook.errors.category}</Box>
							) : null}
							<Input
								placeholder="Description"
								name="description"
								type="text"
								onChange={formikHook.handleChange}
							/>
							{formikHook.touched.description &&
							formikHook.errors.description ? (
								<Box color={"red"}>{formikHook.errors.description}</Box>
							) : null}
							<Input
								placeholder="Enter Date of Announcement"
								name="date"
								type="date"
								onChange={formikHook.handleChange}
							/>
							{formikHook.touched.date && formikHook.errors.date ? (
								<Box color={"red"}>{formikHook.errors.date}</Box>
							) : null}
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

export default AnnouncementsModal;
