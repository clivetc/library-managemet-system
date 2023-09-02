import React from "react";
import { Box, Text, Button, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

interface IProps {
  books: Record<string, any>[];
}

const BookList = ({ books }: IProps) => {
  return (
    <Flex flexWrap="wrap">
      {books.map((book: any) => (
        <Box
          key={book.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          flexBasis="30%"
          m={2}
        >
          <Image
            src={book.image}
            alt={book.title}
            h="200px"
            w="100%"
            objectFit="cover"
          />
          <Text fontSize="xl" mt={2}>
            {book.title}
          </Text>
          <Link href={`/books/${book.id}`}>
            <Button mt={2} colorScheme="teal">
              View Details
            </Button>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default BookList;
