import { FormikProps } from "formik";
import React from "react";
import {
	Box,
	Input,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
	Stack,
	ModalBody,
	Button,
	ModalFooter,
	ModalCloseButton,
} from "@chakra-ui/react";

interface IProps {
	isOpen: boolean;
	onClose: VoidFunction;
	formikHook: FormikProps<any>;
	isLoading: boolean;
}
const BookAppointment = ({
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
									Book Appointment
								</Text>
							</Box>
							<Input
								placeholder="Enter Phone Number"
								name="phoneNumber"
								type="phone"
								onChange={formikHook.handleChange}
							/>
							<Input
								placeholder="Enter Date of Appointment"
								name="date"
								type="date"
								onChange={formikHook.handleChange}
							/>
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
			BookAppointment
		</Modal>
	);
};

export default BookAppointment;
