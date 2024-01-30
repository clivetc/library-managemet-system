import {
	Box,
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Stack,
	Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";

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
								placeholder="Enter Date of  Appointment"
								name="date"
								type="date"
								onChange={(e) =>
									formikHook.setFieldValue("date", e.target.value)
								}
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
						<Button type="submit" colorScheme="blue" isLoading={isLoading}>
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
