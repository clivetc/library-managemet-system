import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppointments } from "@/hooks/appointmentHandler";
import { Box, Card, Center, Skeleton, Text } from "@chakra-ui/react";
import AppointmentsTable from "@/components/AppointmentsTable";

const Appointments = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const { data, dataSource, handleChange } = useAppointments();
	const [selectedDate, setSelectedDate] = useState(new Date());

	const isUnresolvedAppointment = (date: Date) => {
		return (
			dataSource?.data?.some(
				(appointment: any) =>
					new Date(appointment.date).toDateString() === date.toDateString() &&
					!appointment.resolved,
			) ?? false
		);
	};

	const isResolvedAppointment = (date: Date) => {
		return (
			dataSource?.data?.some(
				(appointment: any) =>
					new Date(appointment.date).toDateString() === date.toDateString() &&
					appointment.resolved,
			) ?? false
		);
	};

	const customTileContent = ({ date, view }: any) => {
		return (
			<Box>
				{isUnresolvedAppointment(date) && <Box color={"red"}>✘</Box>}
				{isResolvedAppointment(date) && <Box color={"green"}>✔</Box>}
			</Box>
		);
	};

	return (
		<Center>
			{!user ? (
				Array(6)
					.fill(null)
					.map((a, i) => <Skeleton key={i} h={"100px"} />)
			) : !user?.isadmin ? (
				<Box>
					<Text fontSize="x-large" fontWeight="bold" mb={3}>
						Please check if your appointment has been approved
					</Text>
					<Box
						p={5}
						height="70vh"
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						borderRadius="lg"
						boxShadow="md"
						bgColor="white"
					>
						<Calendar
							onChange={(date) => setSelectedDate(date as Date)}
							value={selectedDate}
							tileContent={customTileContent}
							calendarType="US"
						/>
					</Box>
				</Box>
			) : (
				<Card mt={4}>
					<Text
						fontSize="x-large"
						fontWeight="bold"
						mb={3}
						textAlign={"center"}
					>
						Appointment List
					</Text>
					<AppointmentsTable data={data ?? []} handleOpen={handleChange} />
				</Card>
			)}
		</Center>
	);
};

export default Appointments;
