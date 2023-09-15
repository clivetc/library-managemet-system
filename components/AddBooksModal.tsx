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

interface IProps {
  formikHook: FormikProps<any>;
  onClose: () => void;
  isOpen: boolean;
}

const AddBooksModal = ({ formikHook, onClose, isOpen }: IProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setSelectedImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                name="availableDate"
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
                name="imageUrl"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const selectedFile =
                    e.target.files && e.target.files[0];
                  if (selectedFile) {
                    formikHook.setFieldValue("imageUrl", selectedFile);
                    handleImageUpload(e);
                  }
                }}
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
