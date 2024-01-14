import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AdminDashboard from "./admin/dashboard";
import UserDashBoard from "./UserDashBoard";

export default function Home() {
	const isAdmin = useSelector((state: RootState) => state.auth.user?.isAdmin);

	return <main>{isAdmin ? <AdminDashboard /> : <UserDashBoard />}</main>;
}
