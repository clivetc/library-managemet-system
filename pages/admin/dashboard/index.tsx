import AddBooksModal from '@/components/AddBooksModal'
import { useBooksHandler } from '@/hooks/booksHandler'
import BooksPage from '@/pages/users/dashboard'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Box, Flex } from '@chakra-ui/react'
import React from 'react'

const AdminDashboard = () => {
    const { formik, isFetching, isLoading, isOpen, onClose, onOpen } = useBooksHandler()

    return (
        <Box p={4}>
            <Flex justifyContent={'flex-end'} mb={5}><Button onClick={onOpen}>Add Book</Button></Flex>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Books List</Tab>
                    <Tab>Books Table</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <BooksPage />
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <AddBooksModal formikHook={formik} onClose={onClose} isOpen={isOpen} />
        </Box>
    )
}

export default AdminDashboard