import { RootState } from "@/redux/store";
import { createPost, getPosts } from "@/services/api/service/posts";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

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
		refetchOnMount: true,
		enabled: !!isAuthorized,
	});

	const { mutate, isLoading: booksLoading } = useMutation(createPost, {
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

	return { postsData, fetchingPosts, refetchPosts };
};
