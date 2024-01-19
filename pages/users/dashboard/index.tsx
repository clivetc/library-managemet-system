import React from "react";
import { Box, Button, Center, Flex, Spinner } from "@chakra-ui/react";
import BookList from "@/components/BookList";
import { useBooksHandler } from "@/hooks/booksHandler";
import { IBooks } from "@/types/interfaces";

const BooksPage = () => {
	const { data, isFetching, isLoading } = useBooksHandler();

	const books = data?.data ?? [];

	return (
		<Box>
			{isLoading ? (
				<Box w="100vw">
					<Center height="100vh">
						<Spinner size="xl" />
					</Center>
				</Box>
			) : (
				<Box>
					<BookList data={books} />
				</Box>
			)}
		</Box>
	);
};

export default BooksPage;
