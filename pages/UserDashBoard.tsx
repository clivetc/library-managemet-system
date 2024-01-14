import { Box, Button, Flex, List, ListIcon, ListItem } from "@chakra-ui/react";
import React from "react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import BooksPage from "./users/dashboard";

const UserDashBoard = () => {
	return (
		<Box p="4">
			<Flex justifyContent={"flex-end"} mt={"3"}>
				<Button colorScheme="blue">Book Appointment</Button>
			</Flex>
			<List spacing={3}>
				<ListItem>
					<ListIcon as={MdCheckCircle} color="green.500" />
					Lorem ipsum dolor sit amet, consectetur adipisicing elit
				</ListItem>
				<ListItem>
					<ListIcon as={MdCheckCircle} color="green.500" />
					Assumenda, quia temporibus eveniet a libero incidunt suscipit
				</ListItem>
				<ListItem>
					<ListIcon as={MdCheckCircle} color="green.500" />
					Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
				</ListItem>
				{/* You can also use custom icons from react-icons */}
				<ListItem>
					<ListIcon as={MdSettings} color="green.500" />
					Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
				</ListItem>
			</List>
			<BooksPage />
		</Box>
	);
};

export default UserDashBoard;
