import Image from "next/image";
import BooksPage from "./users/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AdminDashboard from "./admin/dashboard";

export default function Home() {

  const isAdmin = useSelector(
    (state: RootState) => state.admin.adminUser?.isAdmin,
  );

  return (
    <main>
      {isAdmin ? <AdminDashboard /> : <BooksPage />}
    </main>
  );
}
