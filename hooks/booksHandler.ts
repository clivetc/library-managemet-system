import { RootState } from "@/redux/store";
import {
	addBooks,
	getBooks,
	deleteBook,
	updateBook,
} from "@/services/api/service/books";
import { IFormik, IUserBooks } from "@/types/interfaces";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

export const useBooksHandler = () => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedRow, setSelectedRow] = useState<IUserBooks | null>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isUpdate, setUpdate] = useState(false);

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
			formik.resetForm();
			setSelectedImage(null);
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
			formik.resetForm();
			setSelectedImage(null);
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

	const { mutate: updateBooks } = useMutation(
		({ id, data }: { id: string; data: Partial<IUserBooks> }) =>
			updateBook(id, data),
		{
			onSuccess: (res) => {
				toast({
					description: "Book Successfully Updated",
					status: "success",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});
				onClose();
				refetch();
				formik.resetForm();
				setSelectedImage(null);
			},

			onError: (err: any) => {
				toast({
					description: err.response.data.error,
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});
			},
		},
	);

	const formik = useFormik<IFormik>({
		initialValues: {
			title: selectedRow?.title ?? "",
			imageurl: selectedRow?.imageurl ?? "",
			description: selectedRow?.description ?? "",
			author: selectedRow?.author ?? "",
			available: true,
			availabledate: "",
			quantity: selectedRow?.quantity ?? 0,
		},
		onSubmit: (values) => {
			const payload = {
				id: selectedRow?.id || "",
				data: values,
			};
			if (!isUpdate) {
				mutate(values);
			} else updateBooks(payload);
		},
	});

	useEffect(() => {
		if (selectedRow) {
			formik.setValues({
				title: selectedRow.title,
				imageurl: selectedRow.imageurl,
				description: selectedRow.description,
				author: selectedRow.author,
				available: selectedRow.available,
				availabledate: selectedRow.availabledate,
				quantity: selectedRow.quantity,
			});
		}
	}, [selectedRow]);

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
		selectedImage,
		setSelectedImage,
		setUpdate,
	};
};
