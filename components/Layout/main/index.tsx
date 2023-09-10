import Topbar from "@/components/TopBar";
import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import Footer from "../Footer";

interface IProps {
  children: ReactNode;
  userName: string;
  logOut: () => void;
}

const MainLayout: FC<IProps> = ({ children, userName, logOut }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Topbar userName={userName} logOut={logOut} />
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
