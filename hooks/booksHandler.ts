import { addBooks, getBooks } from "@/services/api/service/books";
import { IBooks } from "@/types/interfaces";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";

export const useBooksHandler = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, isFetching, refetch } = useQuery(
    "available-books",
    () => getBooks(),
  );

  const { mutate, isLoading: booksLoading } = useMutation(addBooks, {
    onSuccess: (res) => {
      toast({
        description: "Book Sucessfully Added",
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

  const formik = useFormik<IBooks>({
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
  };
};
