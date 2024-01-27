import { RootState } from "@/redux/store";
import { Box, Skeleton } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AdminBooks from "./admin/dashboard/AdminBooks";
import BooksPage from "./users/dashboard";

const Books = () => {
	const user = useSelector((settings: RootState) => settings.auth.user);
	const isAdmin = useSelector((state: RootState) => state.auth.user?.isadmin);

	return (
		<Box p={4}>
			{!user ? (
				Array(6)
					.fill(null)
					.map((a, i) => <Skeleton key={i} h={"100px"} />)
			) : isAdmin ? (
				<AdminBooks />
			) : (
				<BooksPage />
			)}
		</Box>
	);
};

export default Books;
