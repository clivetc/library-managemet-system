import { IAnnouncements } from "@/types/interfaces";
import { dataNow } from "@/utils/app/settings";
import { ColType, PaginatedTable } from "chakra-paginated-table";
import React, { useState } from "react";

type TAnnProps = {
	data: IAnnouncements[];
};

const columns: () => ColType<IAnnouncements>[] = () => {
	return [
		{
			title: "Title",
			key: "title",
			dataKey: "title",
		},
		{
			title: "Description",
			key: "description",
			dataKey: "description",
		},
		{
			title: "Category",
			key: "category",
			dataKey: "category",
		},
		{
			title: "Date",
			key: "date",
			dataKey: "date",
			render: (rowData) => {
				return dataNow(rowData).format("MMMM D, YYYY");
			},
		},
	];
};

const AnnouncementTable = (props: TAnnProps) => {
	const [pageNum, setPageNum] = useState(1);

	return (
		<PaginatedTable<IAnnouncements>
			dataSource={props?.data}
			columns={columns()}
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

export default AnnouncementTable;
