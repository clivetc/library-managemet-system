import { RootState } from "@/redux/store";
import { addBooks, getBooks, deleteBook } from "@/services/api/service/books";
import { IFormik, IUserBooks } from "@/types/interfaces";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

export const useBooksHandler = () => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedRow, setSelectedRow] = useState<IUserBooks>();

	const isAuthorized = useSelector(
		(state: RootState) => state.auth.isAuthorized,
	);

	const { data, isLoading, isFetching, refetch } = useQuery(
		"available-books",
		() => getBooks(),
		{
			refetchOnMount: true,
			enabled: !!isAuthorized,
		},
	);

	const { mutate, isLoading: booksLoading } = useMutation(addBooks, {
		onSuccess: (res) => {
			toast({
				description: "Book Successfully Added",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
			onClose();
			refetch();
		},

		onError: (err: any) => {
			toast({
				description: err.response.data.error,
				status: "error",
				duration: 5000, // Toast will be displayed for 5 seconds
				isClosable: true,
				position: "top-right",
			});
		},
	});

	const { mutate: deleteFn } = useMutation(deleteBook, {
		onSuccess: (res) => {
			toast({
				description: "Book Successfully Deleted",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
			refetch();
		},

		onError: (err: any) => {
			toast({
				description: err.response.data.error,
				status: "error",
				duration: 5000, // Toast will be displayed for 5 seconds
				isClosable: true,
				position: "top-right",
			});
		},
	});

	const formik = useFormik<IFormik>({
		initialValues: {
			title: "",
			imageurl: "",
			description: "",
			author: "",
			available: true,
			availabledate: "",
		},
		onSubmit: (values) => {
			mutate(values);
		},
	});
	return {
		formik,
		data,
		isFetching,
		isLoading,
		booksLoading,
		isOpen,
		onOpen,
		onClose,
		selectedRow,
		setSelectedRow,
		deleteFn,
	};
};
