import { FC, ReactNode } from "react";
import AuthLayout from "./auth";
import MainLayout from "./main";
import { useRouter } from "next/router";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  const router = useRouter();
  const authRoutes = ["/users/auth/login", "/users/auth/register"];

  const useAuthLayout = authRoutes.includes(router.pathname);

  return (
    <>
      {useAuthLayout ? (
        <AuthLayout>{children} </AuthLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
};

export default Layout;
