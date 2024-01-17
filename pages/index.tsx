import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AdminDashboard from "./admin/dashboard";
import UserDashBoard from "./UserDashBoard";

export default function Home() {
	const isadmin = useSelector((state: RootState) => state.auth.user?.isadmin);

	return <main>{isadmin ? <AdminDashboard /> : <UserDashBoard />}</main>;
}
