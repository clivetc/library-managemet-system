import { IUserBooks } from "@/types/interfaces";
import {
	Box,
	Button,
	Flex,
	Icon,
	Text,
	Image,
	IconButton,
	Tooltip,
} from "@chakra-ui/react";
import React, { RefObject, useRef, useState } from "react";
import { MutateOptions } from "react-query";
import AlertModal from "./common/AlertModal";
import { CiWarning, CiEdit, CiTrash } from "react-icons/ci";

interface IProps {
	data: IUserBooks[];
	handleOpen: (rowData: IUserBooks) => void;
	deleteFn: (
		variables: string,
		options?: MutateOptions<any, any, string, unknown> | undefined,
	) => void;
}
const BooksDashMobile = ({ data, handleOpen, deleteFn }: IProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [selectedBook, setSelectedBook] = useState<IUserBooks | null>(null);
	const [pageSize] = useState(10);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, data.length);
	const pagedData = data.slice(startIndex, endIndex);
	const cancelRef: RefObject<any> = useRef(null);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};
	const totalPages = Math.ceil(data.length / pageSize);

	const pageNumber = Array.from({ length: totalPages }, (_, i) => i + 1);

	const handleDelete = () => {
		if (selectedBook) {
			deleteFn(selectedBook.id);
		}
		setShowConfirmation(false);
	};

	return (
		<Box>
			<Box mt={4}>
				{pagedData.map((item) => (
					<Flex
						justifyContent={"space-between"}
						key={item.id}
						mt={2}
						textAlign={"right"}
						alignContent={"flex-start"}
					>
						<Image src={item.imageurl} height={"50px"} w="50px" />
						<Tooltip label={item.description} placement="top-start">
							<Text fontSize={"sm"} noOfLines={1} isTruncated>
								{item.description}
							</Text>
						</Tooltip>
						<Flex justifyContent={"flex-end"} gap={"5px"}>
							<IconButton
								aria-label=""
								icon={<CiEdit />}
								size={"sm"}
								sx={{
									borderRadius: "50%",
									aspectRatio: "1/1",
									color: "blue",
								}}
								variant={"ghost"}
								onClick={() => handleOpen(item)}
							/>
							<IconButton
								aria-label=""
								icon={<CiTrash />}
								size={"sm"}
								sx={{
									borderRadius: "50%",
									aspectRatio: "1/1",
									color: "red",
								}}
								variant={"ghost"}
								onClick={() => {
									setSelectedBook(item);
									setShowConfirmation(true);
								}}
							/>
						</Flex>
					</Flex>
				))}
				<Flex justifyContent={"flex-end"} gap={"5px"} mt={3}>
					{pageNumber.map((pageNumber) => (
						<Button
							key={pageNumber}
							onClick={() => handlePageChange(pageNumber)}
							variant={"outline"}
							colorScheme={
								currentPage === pageNumber ? "purple.500" : "purple.100"
							}
							size={"xs"}
							borderRadius={"50%"}
						>
							{pageNumber}
						</Button>
					))}
				</Flex>
			</Box>
			<AlertModal
				leastDestructiveRef={cancelRef}
				isOpen={showConfirmation}
				onClose={() => setShowConfirmation(false)}
				contentProps={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 4,
					p: 4,
					w: "400px",
				}}
			>
				<Box
					display={"grid"}
					gridTemplateColumns={"1fr"}
					alignItems={"center"}
					mb={2}
				>
					<Text fontSize={"md"} fontWeight={"bold"}>
						<Icon as={CiWarning} mr={"2"} fontSize={"2xl"} />
						Are you sure you want to delete this book?
					</Text>
				</Box>
				<Flex justifyContent={"flex-end"} gap={3} mt={2}>
					<Button
						ref={cancelRef}
						onClick={() => setShowConfirmation(false)}
						size={"sm"}
					>
						No
					</Button>
					<Button colorScheme="red" onClick={handleDelete} size={"sm"}>
						Yes
					</Button>
				</Flex>
			</AlertModal>
		</Box>
	);
};

export default BooksDashMobile;
