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

  useEffect(() => {
    // Check if we are on the client side before using next/router
    if (typeof window !== "undefined") {
      if (loading) {
        setIsLoading(true);
      } else if (!isAuthorized) {
        if (!router.pathname.startsWith("/auth")) {
          router.push("/users/auth/login");
        }
      } else {
        setIsLoading(false);
      }
    }
  }, [loading, isAuthorized, router]);

  if (loading)
    return (
      <Flex alignItems={"center"} justifyContent={"center"} minHeight="100vh">
        <Spinner />
      </Flex>
    );

  if (!isAuthorized) {
    return <AuthLayout>{children} </AuthLayout>;
  }

  return (
    <MainLayout userName={user?.name || "N/A"} logOut={logout}>
      {children}
    </MainLayout>
  );
};

export default Layout;
