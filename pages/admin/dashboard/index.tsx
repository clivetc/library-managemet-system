import AddBooksModal from "@/components/AddBooksModal";
import BooksTable from "@/components/BooksTable";
import { TRowSelection } from "@/components/definitions";
import { useBooksHandler } from "@/hooks/booksHandler";
import { useAddAdminHandler } from "@/hooks/addAdminHandler";
import BooksPage from "@/pages/users/dashboard";
import { IUserBooks } from "@/types/interfaces";
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

const AdminDashboard = () => {
	const [visible, setVisible] = useState(false);

	const {
		formik,
		isFetching,
		isLoading,
		isOpen,
		onClose,
		onOpen,
		data,
		selectedRow,
		setSelectedRow,
		deleteFn,
	} = useBooksHandler();

	const { formikHook, isModalOpen, setIsModalOpen, adminDataSource } =
		useAddAdminHandler();

	const dataSource = data?.books ?? [];

	const handleOpen = (rowData: IUserBooks, action: TRowSelection) => {
		setSelectedRow(rowData);
		if (action === "edit") {
			setVisible(true);
		} else if (action === "delete") {
			if (selectedRow) {
				deleteFn(selectedRow?.id);
			} else {
				console.error("Invalid book ID");
			}
		}
	};

	return (
		<Box p={4}>
			<Flex justifyContent={"flex-end"} mb={5} gap={3}>
				<Button
					onClick={() => setIsModalOpen(true)}
					colorScheme="blue"
					variant={"outline"}
					size="md"
				>
					Add New Admin
				</Button>
				<Button onClick={onOpen} colorScheme="blue" size="md">
					Add New Book
				</Button>
			</Flex>
			<Tabs variant="soft-rounded" colorScheme="green">
				<TabList>
					<Tab>Books Table</Tab>
					<Tab>Books List</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<BooksTable data={dataSource} handleOpen={handleOpen} />
					</TabPanel>
					<TabPanel>
						<BooksPage />
					</TabPanel>
				</TabPanels>
			</Tabs>
			<AddBooksModal formikHook={formik} onClose={onClose} isOpen={isOpen} />
			<AddAdminModal
				formikHook={formikHook}
				onClose={() => setIsModalOpen(false)}
				isOpen={isModalOpen}
			/>
		</Box>
	);
};

export default AdminDashboard;
