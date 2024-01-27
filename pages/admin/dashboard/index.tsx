import { useAddAdminHandler } from "@/hooks/addAdminHandler";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Button,
	Box,
	Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AddAdminModal from "@/components/AddAdminModal";
import { usePosts } from "@/hooks/postsHandler";
import NewPost from "@/components/NewPost";
import { useAnnouncements } from "@/hooks/announcementHandler";
import AnnouncementTable from "@/components/AnnouncementTable";
import PostsTable from "@/components/PostsTable";
import AnnouncementsModal from "@/components/AnnouncementsModal";

const AdminDashboard = () => {
	const { formikHook, isModalOpen, setIsModalOpen } = useAddAdminHandler();
	const {
		postsData,
		fetchingPosts,
		refetchPosts,
		handSubmitPost,
		isOpen: isPostOpen,
		onOpen: openPost,
		onClose: onPostCose,
		postsLoading,
	} = usePosts();

	const {
		formikAccHook,
		isLoading: loadingAnnouncement,
		isOpen: isAnnouncement,
		onOpen: onOpenAnnouncement,
		announcementData,
		onClose: onCloseAnnouncement,
	} = useAnnouncements();

	return (
		<Box p={4}>
			<Flex justifyContent={"flex-end"} mb={5} gap={3}>
				<Button
					onClick={() => setIsModalOpen(true)}
					colorScheme="blue"
					variant={"outline"}
					size="sm"
				>
					Add New Admin
				</Button>

				<Button onClick={openPost} colorScheme="blue" size="sm">
					Add New Post
				</Button>
				<Button onClick={onOpenAnnouncement} colorScheme="blue" size="sm">
					Add New Announcement
				</Button>
			</Flex>
			<Tabs variant="soft-rounded" colorScheme="green">
				<TabList>
					<Tab>Posts</Tab>
					<Tab>Announcements</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<PostsTable data={postsData?.data ?? []} />
					</TabPanel>
					<TabPanel>
						<AnnouncementTable data={announcementData?.data ?? []} />
					</TabPanel>
				</TabPanels>
			</Tabs>

			<AddAdminModal
				formikHook={formikHook}
				onClose={() => setIsModalOpen(false)}
				isOpen={isModalOpen}
			/>
			<NewPost
				isOpen={isPostOpen}
				onClose={onPostCose}
				formikHook={handSubmitPost}
			/>
			<AnnouncementsModal
				isOpen={isAnnouncement}
				onClose={onCloseAnnouncement}
				formikHook={formikAccHook}
				isLoading={loadingAnnouncement}
			/>
		</Box>
	);
};

export default AdminDashboard;
