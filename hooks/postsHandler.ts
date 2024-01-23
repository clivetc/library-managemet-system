import { RootState } from "@/redux/store";
import { createPost, getPosts } from "@/services/api/service/posts";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface IValues {
	post: string;
	enabled: boolean;
}

export const usePosts = () => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isAuthorized = useSelector(
		(state: RootState) => state.auth.isAuthorized,
	);
	const {
		data: postsData,
		isFetching: fetchingPosts,
		refetch: refetchPosts,
	} = useQuery("get-posts", getPosts, {
		refetchOnMount: false,
		enabled: !!isAuthorized,
	});

	const { mutate, isLoading: postsLoading } = useMutation(createPost, {
		onSuccess: (res) => {
			toast({
				description: "Post Successfully Added",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
			onClose();
			refetchPosts();
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
	});

	const handSubmitPost = useFormik<IValues>({
		initialValues: {
			post: "",
			enabled: true,
		},
		onSubmit: (values) => {
			mutate(values);
		},
		validationSchema: yup.object().shape({
			post: yup.string().required("Email is required"),
		}),
	});

	return {
		postsData,
		fetchingPosts,
		refetchPosts,
		handSubmitPost,
		isOpen,
		onOpen,
		postsLoading,
		onClose,
	};
};
