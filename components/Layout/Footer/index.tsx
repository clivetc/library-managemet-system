import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
	return (
		<Box bg="gray.800" color="white" py={3}>
			<Flex justify="center" align="center">
				<Text>
					&copy; {new Date().getFullYear()} FifCyprus. All rights reserved.
				</Text>
			</Flex>
		</Box>
	);
};

export default Footer;
