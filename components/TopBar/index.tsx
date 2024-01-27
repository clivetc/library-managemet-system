import React, { useState, useEffect } from "react";
import {
	Box,
	Flex,
	Spacer,
	Button,
	IconButton,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	List,
	ListItem,
} from "@chakra-ui/react";
import { HiMenuAlt1, HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";

interface IProps {
	userName: string;
	logOut: () => void;
}

const Topbar = ({ userName, logOut }: IProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const updateWindowSize = () => {
				setIsMobile(window.innerWidth <= 768);
			};
			updateWindowSize();
			window.addEventListener("resize", updateWindowSize);
			return () => {
				window.removeEventListener("resize", updateWindowSize);
			};
		}
	}, []);

	return (
		<Box bg="purple" p={4}>
			<Flex align="center">
				<Box>
					<Button
						as="a"
						href="/"
						color="white"
						fontWeight="bold"
						bg="transparent"
						fontSize="lg"
						_hover={{ textDecoration: "none" }}
					>
						<Image
							src="/static/church_logo.png"
							alt="logo"
							height={50}
							width={50}
						/>
					</Button>
				</Box>
				<Spacer />
				{isMobile ? (
					<IconButton
						icon={<HiMenuAlt1 />}
						colorScheme="white"
						aria-label="Menu"
						onClick={onOpen}
					/>
				) : (
					<List display="flex" alignItems="center">
						<ListItem>
							<Button
								as="a"
								href="/"
								color="white"
								_hover={{ textDecoration: "none" }}
								bg="transparent"
							>
								Hi, {userName}
							</Button>
						</ListItem>
						<ListItem>
							<Button
								as="a"
								href="/books"
								color="white"
								_hover={{ textDecoration: "none" }}
								bg="transparent"
								outline={"none"}
							>
								Books
							</Button>
						</ListItem>
						<ListItem>
							<Button
								as="a"
								href="/appointments"
								color="white"
								_hover={{ textDecoration: "none" }}
								bg="transparent"
								outline={"none"}
							>
								Appointments
							</Button>
						</ListItem>
						<ListItem>
							<Button
								as="a"
								color="white"
								_hover={{ textDecoration: "none" }}
								bg="transparent"
								onClick={logOut}
								outline={"none"}
								leftIcon={<HiOutlineLogout />}
							>
								Log Out
							</Button>
						</ListItem>
					</List>
				)}
			</Flex>
			<Drawer placement="right" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Menu</DrawerHeader>
					<DrawerBody>
						<List>
							<ListItem>
								<Button
									onClick={onClose}
									w="100%"
									bg="transparent"
									outline={"none"}
								>
									Hi, {userName}
								</Button>
							</ListItem>
							<ListItem>
								<Button
									w="100%"
									as="a"
									href="/books"
									color="black"
									_hover={{ textDecoration: "none" }}
									bg="transparent"
									outline={"none"}
								>
									Books
								</Button>
							</ListItem>
							<ListItem>
								<Button
									w="100%"
									as="a"
									href="/appointments"
									color="black"
									_hover={{ textDecoration: "none" }}
									bg="transparent"
									outline={"none"}
								>
									Appointments
								</Button>
							</ListItem>
							<ListItem>
								<Button
									onClick={logOut}
									w="100%"
									outline={"none"}
									leftIcon={<HiOutlineLogout />}
								>
									Log Out
								</Button>
							</ListItem>
						</List>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	);
};

export default Topbar;
