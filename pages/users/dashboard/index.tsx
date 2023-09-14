import React from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import BookList from "@/components/BookList";
import { useBooksHandler } from "@/hooks/booksHandler";
import { IBooks } from "@/types/interfaces";

const BooksPage = () => {
  const { data, isFetching, isLoading } = useBooksHandler();

  const books = data ?? [];

  return (
    <Box>
      {isLoading ? (
        <Box w='100vw'>
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
        </Box>
      ) : (
        <BookList data={books} />
      )}
    </Box>
  );
};

export default BooksPage;
