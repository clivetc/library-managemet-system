import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Box,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import imageCompression from "browser-image-compression";

interface IProps {
  formikHook: FormikProps<any>;
  onClose: () => void;
  isOpen: boolean;
}

const AddBooksModal = ({ formikHook, onClose, isOpen }: IProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            formikHook.setFieldValue("imageUrl", reader.result);
          }
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'md'}>
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
                placeholder="Enter Date When Book is available"
                name="availabledate"
                type="date"
                onChange={formikHook.handleChange}
              />
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
            <Button type="reset" onClick={formikHook.handleReset} variant='outline'>
              Reset
            </Button>
            <Button type="submit" colorScheme="blue">Submit</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddBooksModal;
