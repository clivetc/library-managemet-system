// Layout.tsx
import { FC, ReactNode, useEffect, useState } from "react";
import AuthLayout from "./auth";
import MainLayout from "./main";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/authReducer";
import { Flex, Spinner } from "@chakra-ui/react";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const dispatch = useDispatch();

  const authRoutes = [
    "/users/auth/login",
    "/users/auth/admin",
    "/users/auth/register",
  ];

  const isAuthScreen = authRoutes.includes(router.pathname);

  useEffect(() => {
    if (loading === "pending") {
      setIsLoading(true);
    } else if (!isAuthorized) {
      if (!isAuthScreen) {
        router.push("/users/auth/login");
      }
    } else {
      setIsLoading(false);
    }
  }, [loading, isAuthorized, router, isAuthScreen]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <div>
      {isLoading ? (
        <Flex justify="center" align="center" height="100vh">
          Loading...
        </Flex>
      ) : isAuthorized ? (
        <MainLayout userName={user?.name || "N/A"} logOut={handleLogout}>
          {children}
        </MainLayout>
      ) : (
        <AuthLayout>{children}</AuthLayout>
      )}
    </div>
  );
};

export default Layout;
