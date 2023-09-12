import { FC, ReactNode, useEffect, useState } from "react";
import AuthLayout from "./auth";
import MainLayout from "./main";
import { useRouter } from "next/router";
import { useAuth } from "@/Context/AuthContext";
import { Flex, Spinner } from "@chakra-ui/react";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [user, router]);

  const authRoutes = [
    "/users/auth/login",
    "/admin/auth/login",
    "/users/auth/register",
  ];

  const useAuthLayout = authRoutes.includes(router.pathname);

  useEffect(() => {
    if (!user?.id) {
      if (!useAuthLayout) {
        router.push("/users/auth/login"); // Replace with the actual login page route
      }
    }
    // Redirect to login page if user is not logged in or has no accessToken
  }, [useAuthLayout, user, router]);

  if (isLoading)
    return (
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  return (
    <>
      {user?.id ? (
        <MainLayout userName={user?.name || "N/A"} logOut={logout}>
          {children}
        </MainLayout>
      ) : (
        <AuthLayout>{children} </AuthLayout>
      )}
    </>
  );
};

export default Layout;
