// Layout.tsx
import { FC, ReactNode, useEffect, useState } from "react";
import AuthLayout from "./auth";
import MainLayout from "./main";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout, userAsyncActions } from "@/redux/slice/authReducer";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserById } from "@/services/api/service/getUser";
import { adminAsyncActions, logoutAdmin } from "@/redux/slice/adminAuthReducer";
import { AnyAction } from "redux";
import { IUser } from "@/types/interfaces";

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
  const admin = useSelector((state: RootState) => state.admin.user);

  const dispatch = useDispatch();

  const authRoutes = [
    "/users/auth/login",
    "/admin/auth/login",
    "/users/auth/register",
  ];

  const isAuthScreen = authRoutes.includes(router.pathname);

  useEffect(() => {
    if (isAuthorized) {

      dispatch(userAsyncActions.userData() as unknown as AnyAction)
    } if (isAdminAuthorized) {
      dispatch(adminAsyncActions.adminData() as unknown as AnyAction)
    }
  }, [dispatch, isAuthorized])


  useEffect(() => {
    if (loading === 'pending') {
      setIsLoading(true);
    } else if (!isAuthorized && !isAdminAuthorized) {
      if (authRoutes.includes(router.pathname)) {
        setIsLoading(false);
      } else {
        router.replace('/users/auth/login');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [loading, isAdminAuthorized, isAuthorized]);


  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutAdmin());
    localStorage.clear();
  };

  if (isLoading) {
    return <Box w={'100vw'}>
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    </Box>
  }

  if (!isAuthorized && !isAdminAuthorized) {
    return <div><AuthLayout>{children}</AuthLayout></div>
  }

  console.log({ admin });

  return (
    <div>
      <MainLayout userName={user ? user?.name || "N/A" : "N/A"} logOut={handleLogout}>
        {children}
      </MainLayout>
    </div>
  );
};

export default Layout;
