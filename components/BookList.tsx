import React, { useState } from "react";
import {
	Divider,
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
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Stack,
	Heading,
	Box,
	Center,
	useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { IUserBooks, IBooks } from "@/types/interfaces";

interface IProps {
	data: IUserBooks[];
}

const BookList = ({ data }: IProps) => {
	const [selectedBook, setSelectedBook] = useState<IUserBooks | null>(null);
	const [isSmaller] = useMediaQuery("max-width:1550px");
	const modalSize = isSmaller ? "xs" : "md";

	const openModal = (book: IUserBooks) => {
		setSelectedBook(book);
	};

	const closeModal = () => {
		setSelectedBook(null);
	};

	return (
		<Flex flexWrap="wrap" justifyContent="center" alignContent="center">
			{data?.map((book: IUserBooks) => (
				<Box display="flex" gap={3} mt={2} p={2} key={book.id}>
					<Card maxW="sm" key={book.title} mr="2" w={"300px"}>
						<CardBody>
							<Center>
								<Image
									src={book.imageurl}
									alt={book.title}
									borderRadius="lg"
									h="400px"
									w="auto"
									objectFit="cover"
								/>
							</Center>

							<Stack mt="6" spacing="3">
								<Heading size="md">{book.author}</Heading>
								<Text>{book.description}</Text>
							</Stack>
						</CardBody>
						<Divider />
						<CardFooter>
							<Button
								mt={2}
								colorScheme="teal"
								onClick={() => openModal(book)}
								isDisabled={!book.available}
								w="full"
							>
								View Details
							</Button>
						</CardFooter>
					</Card>
				</Box>
			))}
			{selectedBook && (
				<Modal isOpen={true} onClose={closeModal} size={modalSize} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{selectedBook.title}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Card
								direction={{ base: "column", sm: "row" }}
								overflow="hidden"
								variant="outline"
							>
								<Image
									objectFit="cover"
									w={{ base: "100%", sm: "100px" }}
									h={{ base: "100%", sm: "100px" }}
									src={selectedBook.imageurl}
									alt={selectedBook.title}
								/>

								<Stack>
									<CardBody>
										<Heading size={modalSize}>{selectedBook.author}</Heading>

										<Text py="2">{selectedBook.description}</Text>
									</CardBody>
								</Stack>
							</Card>
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
