import { FC, ReactNode, useEffect } from "react";
import AuthLayout from "./auth";
import MainLayout from "./main";
import { useRouter } from "next/router";
import { useAuth } from "@/Context/AuthContext";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const authRoutes = [
    "/users/auth/login",
    "/admin/auth/login",
    "/users/auth/register",
  ];

  const useAuthLayout = authRoutes.includes(router.pathname);
  useEffect(() => {
    // Redirect to login page if user is not logged in or has no accessToken
    if (!useAuthLayout && !user?.id) {
      router.push("/users/auth/login"); // Replace with the actual login page route
    }
  }, [useAuthLayout, user, router]);
  console.log({ user });
  return (
    <>
      {useAuthLayout ? (
        <AuthLayout>{children} </AuthLayout>
      ) : (
        <MainLayout userName={user?.username || "N/A"} logOut={logout}>
          {children}
        </MainLayout>
      )}
    </>
  );
};

export default Layout;
