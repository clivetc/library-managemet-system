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
import BookAppointment from "@/components/BookAppointment";
import { useAppointments } from "@/hooks/appointmentHandler";
import AnnouncementsCard from "@/components/AnnouncementsCard";
import { useAnnouncements } from "@/hooks/announcementHandler";

const UserDashBoard = () => {
	const { postsData, postsLoading } = usePosts();
	const { isLoading, isOpen, onClose, onOpen, formik } = useAppointments();
	const { announcementData } = useAnnouncements();

	return (
		<Box p="4">
			<Flex justifyContent={"flex-end"} mt={"3"}>
				<Button colorScheme="blue" onClick={onOpen}>
					Book Appointment
				</Button>
			</Flex>
			<Box>
				<Text fontSize={"2xl"} fontWeight={"bold"}>
					Word for today
				</Text>
			</Box>
			<List spacing={3}>
				<ListItem>
					<ListIcon as={MdCheckCircle} color="green.500" />
					{postsData?.data?.length
						? postsData?.data?.[0]?.post
						: "No Post available"}
				</ListItem>
			</List>
			<AnnouncementsCard data={announcementData?.data || []} />
			<BookAppointment
				isOpen={isOpen}
				onClose={onClose}
				formikHook={formik}
				isLoading={isLoading}
			/>
		</Box>
	);
};

export default UserDashBoard;
