import {
	Box,
	Button,
	Flex,
	List,
	ListIcon,
	ListItem,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import BooksPage from "./users/dashboard";
import { usePosts } from "@/hooks/postsHandler";

const UserDashBoard = () => {
	const { postsData, postsLoading } = usePosts();

	return (
		<Box p="4">
			<Flex justifyContent={"flex-end"} mt={"3"}>
				<Button colorScheme="blue">Book Appointment</Button>
			</Flex>
			<Box>
				<Text fontSize={"2xl"} fontWeight={"bold"}>
					Word for today
				</Text>
			</Box>
			<List spacing={3}>
				<ListItem>
					<ListIcon as={MdCheckCircle} color="green.500" />
					{postsData ? postsData?.data?.[0]?.post : "No Post available"}
				</ListItem>
			</List>
			<BooksPage />
		</Box>
	);
};

export default UserDashBoard;
