import { IAnnouncements } from "@/types/interfaces";
import { dataNow } from "@/utils/app/settings";
import { Card, SimpleGrid, Box, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
	data: IAnnouncements[];
}

const AnnouncementsCard = ({ data }: IProps) => {
	const lastTenAnnouncements = data.slice(0, 10);

	return (
		<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
			{lastTenAnnouncements.map((announcement) => (
				<Box key={announcement.id}>
					<Card p={4}>
						<Text fontWeight="bold" fontSize="lg" mb={2}>
							{announcement.title}
						</Text>
						<Text color="gray.500" fontSize="sm" mb={2}>
							{announcement.description}
						</Text>
						<Text color="blue.500" fontSize="sm">
							Category: {announcement.category}
						</Text>
						<Text color="gray.500" fontSize="xs" mt={2}>
							Date: {dataNow(announcement.createdAt).format("MMMM D, YYYY")}
						</Text>
					</Card>
				</Box>
			))}
		</SimpleGrid>
	);
};

export default AnnouncementsCard;
