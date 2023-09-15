// Layout.tsx
import { FC, ReactNode, useEffect, useState } from "react";
import AuthLayout from "./auth";
import MainLayout from "./main";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/authReducer";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserById } from "@/services/api/service/getUser";
import { logoutAdmin } from "@/redux/adminAuthReducer";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const isAdminAuthorized = useSelector((state: RootState) => state.admin.isAdminAuthorized);


  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { data } = useQuery(
    ["user-data", userId],
    () => getUserById(userId),
    {
      enabled: !!userId,
    },
  );

  const dispatch = useDispatch();

  const authRoutes = [
    "/users/auth/login",
    "/admin/auth/login",
    "/users/auth/register",
  ];

  const isAuthScreen = authRoutes.includes(router.pathname);

  useEffect(() => {
    if (loading === "pending") {
      setIsLoading(true);
    } else if (isAdminAuthorized) {
      if (authRoutes.includes('/admin/auth')) {
        router.push('/admin/auth/login')
      }
      setIsLoading(false);
    } else if (!isAuthorized) {
      if (!isAuthScreen) {
        router.push("/users/auth/login");
      }
    } else {
      setIsLoading(false);
    }
  }, [loading, isAuthorized, isAdminAuthorized, router, isAuthScreen]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutAdmin());
    localStorage.clear();
  };

  return (
    <div>
      {isLoading ? (
        <Box w={'100vw'}>
          <Center height="100vh">
            <Spinner size="xl" />
          </Center>
        </Box>
      ) : !isAuthorized && !isAdminAuthorized ? (
        <AuthLayout>{children}</AuthLayout>

      ) : (
        <MainLayout userName={data?.name || "N/A"} logOut={handleLogout}>
          {children}
        </MainLayout>
      )}
    </div>
  );
};

export default Layout;
