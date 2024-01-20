import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AdminDashboard from "./admin/dashboard";
import UserDashBoard from "./UserDashBoard";
import { Skeleton } from "@chakra-ui/react";

export default function Home() {
	const isAdmin = useSelector((state: RootState) => state.auth.user?.isadmin);
	const user = useSelector((state: RootState) => state.auth.user);

	return (
		<main>
			{!user ? (
				Array(6)
					.fill(null)
					.map((a, i) => <Skeleton key={i} h={"100px"} />)
			) : isAdmin ? (
				<AdminDashboard />
			) : (
				<UserDashBoard />
			)}
		</main>
	);
}
