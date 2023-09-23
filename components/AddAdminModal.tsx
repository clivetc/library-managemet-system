import React from 'react'
import { FormikProps } from "formik";
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

interface IProps {
    formikHook: FormikProps<any>;
    onClose: () => void;
    isOpen: boolean;
}

const AddAdminModal = ({ formikHook, isOpen, onClose }: IProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <form onSubmit={formikHook.handleSubmit}>
                    <ModalBody>
                        <Stack spacing={4}>
                            <Text>Please add Admin</Text>

                            <Input
                                placeholder="Enter Email"
                                name="username"
                                type="email"
                                onChange={formikHook.handleChange}
                            />
                            <Input
                                placeholder="Enter First Name"
                                name="firstName"
                                type="text"
                                onChange={formikHook.handleChange}
                            />
                            <Input
                                placeholder="Enter Last Name"
                                name="lastName"
                                type="text"
                                onChange={formikHook.handleChange}
                            />
                            <Input
                                placeholder="Enter Password"
                                name="password"
                                type="text"
                                onChange={formikHook.handleChange}
                            />
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
    )
}

export default AddAdminModal