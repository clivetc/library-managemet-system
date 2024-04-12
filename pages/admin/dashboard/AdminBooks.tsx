import AddBooksModal from "@/components/AddBooksModal";
import BooksDashMobile from "@/components/BooksDashMobile";
import BooksTable from "@/components/BooksTable";
import { TRowSelection } from "@/components/definitions";
import { useBooksHandler } from "@/hooks/booksHandler";
import BooksPage from "@/pages/users/dashboard";
import { IUserBooks } from "@/types/interfaces";
import {
	Box,
	Flex,
	Button,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	useMediaQuery,
	useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AdminBooks = () => {
	const [visible, setVisible] = useState(false);
	const [isSmaller] = useMediaQuery("max-width:1550px");
	const buttonSize = isSmaller ? "xs" : "sm";
	const isMobile = useBreakpointValue({ base: true, md: false });

	const {
		formik,
		setUpdate,
		isOpen,
		onClose,
		onOpen,
		data,
		selectedRow,
		setSelectedRow,
		deleteFn,
		selectedImage,
		setSelectedImage,
	} = useBooksHandler();

	const dataSource = data?.data ?? [];

	const handleOpen = (rowData: IUserBooks, action: TRowSelection) => {
		setSelectedRow(rowData);
		if (action === "edit") {
			setUpdate(true);
			onOpen();
		} else if (action === "delete") {
			if (selectedRow) {
				deleteFn(selectedRow?.id);
			} else {
				console.error("Invalid book ID");
			}
		}
	};
	const handleOpenModal = (rowData: IUserBooks) => {
		setSelectedRow(rowData);
		setUpdate(true);
		onOpen();
	};

	return (
		<Box p={4}>
			<Flex justifyContent={"flex-end"} mb={5} gap={3}>
				<Button onClick={onOpen} colorScheme="blue" size={buttonSize}>
					Add New Book
				</Button>
			</Flex>
			<Tabs variant="soft-rounded" colorScheme="green" size={buttonSize}>
				<TabList>
					<Tab>Books Table</Tab>
					<Tab>Books List</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						{isMobile ? (
							<BooksDashMobile
								data={dataSource}
								handleOpen={handleOpenModal}
								deleteFn={deleteFn}
							/>
						) : (
							<BooksTable data={dataSource} handleOpen={handleOpen} />
						)}
					</TabPanel>
					<TabPanel>
						<BooksPage />
					</TabPanel>
				</TabPanels>
			</Tabs>
			<AddBooksModal
				formikHook={formik}
				onClose={onClose}
				isOpen={isOpen}
				setSelectedImage={setSelectedImage}
				selectedImage={selectedImage}
			/>
		</Box>
	);
};

export default AdminBooks;
