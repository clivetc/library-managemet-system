import { IPosts } from "@/types/interfaces";
import { ColType, PaginatedTable } from "chakra-paginated-table";
import React, { useState } from "react";

type TPostProps = {
	data: IPosts[];
};

const columns: () => ColType<IPosts>[] = () => {
	return [
		{
			title: "Believers Post",
			key: "post",
			dataKey: "post",
		},
	];
};

const PostsTable = (props: TPostProps) => {
	const [pageNum, setPageNum] = useState(1);

	return (
		<PaginatedTable<IPosts>
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

export default PostsTable;
