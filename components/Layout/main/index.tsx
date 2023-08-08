import Topbar from "@/components/TopBar";
import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import Footer from "../Footer";

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Topbar />
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
