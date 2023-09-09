import { Box, Flex } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const AuthLayout: FC<IProps> = ({ children }) => {
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      bg="purple"
    >
      <Box
        p={4}
        width="100%"
        maxWidth={{ md: "400px", base: "300px" }}
        boxShadow="md"
        borderRadius="lg"
        bg="white"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default AuthLayout;
