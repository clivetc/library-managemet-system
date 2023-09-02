import React from "react";
import { Box } from "@chakra-ui/react";
import BookList from "@/components/BookList";

const books = [
  { id: 1, title: "Book 1", description: "Description of Book 1" },
  { id: 2, title: "Book 2", description: "Description of Book 2" },
  { id: 3, title: "Book 3", description: "Description of Book 3" },
];

const BooksPage = () => {
  return (
    <Box>
      <BookList books={books} />
    </Box>
  );
};

export default BooksPage;
