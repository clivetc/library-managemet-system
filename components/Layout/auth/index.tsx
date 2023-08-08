import { Box, Flex } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const AuthLayout: FC<IProps> = ({ children }) => {
  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box p={4} width="100%" maxWidth="400px" boxShadow="md" borderRadius="md">
        {children}
      </Box>
    </Flex>
  );
};

export default AuthLayout;
