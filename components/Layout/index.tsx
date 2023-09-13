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
  const { user, logout, loading, isAuthorized } = useAuth();

  const authRoutes = [
    "/users/auth/login",
    "/admin/auth/login",
    "/users/auth/register",
  ];

  const isAuthScreen = authRoutes.includes(router.pathname);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else if (!isAuthorized) {
      if (isAuthScreen) {
        router.push("/users/auth/login");
      }
    } else {
      setIsLoading(false);
    }
  }, [loading, isAuthorized, router]);

  if (loading)
    return (
      <Flex alignItems={"center"} justifyContent={"center"} minHeight="100vh">
        <Spinner />
      </Flex>
    );

  return (
    <>
      {!isAuthorized ? (
        <AuthLayout>{children} </AuthLayout>
      ) : (
        <MainLayout userName={user?.name || "N/A"} logOut={logout}>
          {children}
        </MainLayout>
      )}
    </>
  );
};

export default Layout;
