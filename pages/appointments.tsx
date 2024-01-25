import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppointments } from "@/hooks/appointmentHandler";
import { Box, Center } from "@chakra-ui/react";

const localizer = momentLocalizer(moment);

const Appointments = () => {
	const isAdmin = useSelector((state: RootState) => state.auth.user?.isadmin);
	const { data, dataSource } = useAppointments();
	console.log({ dataSource });
	const eventPropGetter = (event: boolean) => {
		return {
			style: {
				backgroundColor: event ? "lightgreen" : "lightblue",
			},
		};
	};

	const eventContent = ({ event }: any) => {
		return (
			<div>
				<strong>{event.title}</strong>
				{event.resolved && <span style={{ marginLeft: "8px" }}>✘</span>}
			</div>
		);
	};
	return (
		<Center>
			<Box p={5}>
				<Calendar
					localizer={localizer}
					events={dataSource?.data}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }}
					eventPropGetter={eventPropGetter}
					components={{ event: eventContent }}
				/>
			</Box>
		</Center>
	);
};

export default Appointments;
