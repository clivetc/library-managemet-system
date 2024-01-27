import { IAppointMents } from "@/types/interfaces";
import { TRowSelection } from "./definitions";
import React, { useState } from "react";
import { PaginatedTable, ColType } from "chakra-paginated-table";
import { Button, Switch, Text } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { dataNow } from "@/utils/app/settings";

type handleColumns = (rowData: IAppointMents, action: TRowSelection) => void;

interface IProps {
	data: IAppointMents[];
	handleOpen: handleColumns;
}

const columns: (handleOpen: handleColumns) => ColType<IAppointMents>[] = (
	handleOpen,
) => {
	return [
		{
			title: "Email",
			key: "email",
			dataKey: "email",
		},
		{
			title: "Phone Number",
			key: "phoneNumber",
			dataKey: "phoneNumber",
		},
		{
			title: "Appointment Date",
			key: "date",
			dataKey: "date",
			render: (rowData) => {
				return dataNow(rowData).format("MMMM D, YYYY");
			},
		},
		{
			title: "Booking Confirmation",
			key: "resolved",
			dataKey: "resolved",
			render: (record) => (
				<>
					{/* <Button
						colorScheme="red"
						leftIcon={<BsTrash />}
						size="sm"
						onClick={() => handleOpen(record, "switch")}
						mr={2}
					>
						Delete
					</Button> */}
					<Switch id="email-alert" isChecked={record?.resolved} />
				</>
			),
		},
	];
};

const AppointmentsTable = (props: IProps) => {
	const { handleOpen } = props;
	const [pageNum, setPageNum] = useState(1);

	return (
		<PaginatedTable<IAppointMents>
			dataSource={props?.data}
			columns={columns(handleOpen)}
			rowKey={(record) => record?.id}
			pagination={{
				page: pageNum,
				pageSize: 10,
				total: props?.data?.length,
				onchange(newPage) {
					setPageNum(newPage);
				},
			}}
		/>
	);
};

export default AppointmentsTable;
