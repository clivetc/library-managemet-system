import { addBooks, getBooks } from "@/services/api/service/books";
import { IBooks } from "@/types/interfaces";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";

export const useBooksHandler = () => {
  const toast = useToast();

  const { mutate, isLoading: booksLoading } = useMutation(addBooks, {
    onSuccess: (res) => {
      toast({
        description: res.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
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

  const { data, isLoading, isFetching } = useQuery("available-books", () =>
    getBooks(),
  );

  const formik = useFormik<IBooks>({
    initialValues: {
      title: "",
      imageUrl: "",
      description: "",
      author: "",
      available: true,
      availableDate: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });
  return { formik, data, isFetching, isLoading, booksLoading };
};
