import Image from "next/image";
import BooksPage from "./users/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AdminDashboard from "./admin/dashboard";

export default function Home() {

  const isAdminAuthorized = useSelector(
    (state: RootState) => state.admin.isAdminAuthorized,
  );
  return (
    <main>
      {isAdminAuthorized ? <AdminDashboard /> : <BooksPage />}
    </main>
  );
}
