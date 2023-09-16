import AddBooksModal from "@/components/AddBooksModal";
import BooksTable from "@/components/BooksTable";
import { TRowSelection } from "@/components/definitions";
import { useBooksHandler } from "@/hooks/booksHandler";
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

const AdminDashboard = () => {
    const [visible, setVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IUserBooks>();
    const { formik, isFetching, isLoading, isOpen, onClose, onOpen, data } =
        useBooksHandler();
    const dataSource = data?.books ?? [];

    const handleOpen = (rowData: IUserBooks, action: TRowSelection) => {
        setSelectedRow(rowData);
        if (action === "edit") {
            setVisible(true);
        } else if (action === "delete") {
            console.log({ selectedRow });
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
        </Box>
    );
};

export default AdminDashboard;
