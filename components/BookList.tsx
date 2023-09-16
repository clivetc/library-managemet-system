import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Link from "next/link";
import { IBooks } from "@/types/interfaces";

interface IProps {
  data: any;
}

const BookList = ({ data }: IProps) => {
  const [selectedBook, setSelectedBook] = useState<IBooks | null>(null);

  const openModal = (book: IBooks) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <Flex flexWrap="wrap">
      {data?.books?.map((book: IBooks) => (
        <Box
          key={book.title}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          flexBasis="30%"
          m={2}
        >
          <Image
            src={book.imageurl.data}
            alt={book.title}
            h="200px"
            w="full"
            objectFit="cover"
          />
          <Text fontSize="xl" mt={2}>
            {book.title}
          </Text>
          <Button
            mt={2}
            colorScheme="teal"
            onClick={() => openModal(book)}
            isDisabled={!book.available}
          >
            View Details
          </Button>
        </Box>
      ))}
      {selectedBook && (
        <Modal isOpen={true} onClose={closeModal} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedBook.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedBook.imageurl.data}
                alt={selectedBook.title}
                w="100%"
                h="150"
                objectFit="cover"
                mb={4}
              />
              <Text>{selectedBook.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

export default BookList;
