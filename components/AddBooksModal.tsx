import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Stack,
	Switch,
	Text,
} from "@chakra-ui/react";
import imageCompression from "browser-image-compression";
import { FormikProps } from "formik";
import React, { SetStateAction } from "react";

interface IProps {
	formikHook: FormikProps<any>;
	onClose: () => void;
	isOpen: boolean;
	selectedImage: string | null;
	setSelectedImage: React.Dispatch<SetStateAction<string | null>>;
}

const AddBooksModal = ({
	formikHook,
	onClose,
	isOpen,
	selectedImage,
	setSelectedImage,
}: IProps) => {
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				const options = {
					maxSizeMB: 1,
					maxWidthOrHeight: 200,
					useWebWorker: true,
				};

				const compressedFile = await imageCompression(file, options);

				// Convert the compressed image to base64
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.result && typeof reader.result === "string") {
						setSelectedImage(reader.result);
						const base64Image = reader.result as string;
						formikHook.setFieldValue("imageurl", base64Image);
					}
				};
				reader.readAsDataURL(compressedFile);
			} catch (error) {
				console.error("Error compressing image:", error);
			}
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<form onSubmit={formikHook.handleSubmit}>
					<ModalBody>
						<Stack spacing={4}>
							<Text>Please add a book</Text>
							<Input
								placeholder="Enter Title"
								name="title"
								type="text"
								onChange={formikHook.handleChange}
							/>
							<Input
								placeholder="Enter Author"
								name="author"
								type="text"
								onChange={formikHook.handleChange}
							/>
							<Input
								placeholder="Enter Description"
								name="description"
								type="text"
								onChange={formikHook.handleChange}
							/>
							<Input
								placeholder="Enter Quantity"
								name="quantity"
								type="number"
								onChange={formikHook.handleChange}
							/>
							{/* <Input
								placeholder="Enter Date When Book is available"
								name="availabledate"
								type="date"
								onChange={(e) =>
									formikHook.setFieldValue("availabledate", e.target.value)
								}
							/> */}

							<FormControl display="flex" alignItems="center">
								<FormLabel htmlFor="email-alerts" mb="0">
									Is Book Available
								</FormLabel>
								<Switch
									id="email-alerts"
									name="available"
									onChange={formikHook.handleChange}
								/>
							</FormControl>
							<Input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
							/>
							{selectedImage && (
								<Box>
									<Image
										mt={3}
										src={selectedImage}
										alt="Selected Image"
										maxW="200px"
										maxH="200px"
									/>
								</Box>
							)}
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

export default AddBooksModal;
