import { RootState } from "@/redux/store";
import { addAdmin, getAdmin } from "@/services/api/service/addAdmin";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

export const useAddAdminHandler = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toast = useToast();
	const isAdminAuthorized = useSelector(
		(state: RootState) => state.admin.isAdminAuthorized,
	);

	const { data, isLoading, isFetching, refetch } = useQuery("all-admins", () =>
		getAdmin(),
	);

	const adminDataSource = useMemo(() => {
		if (Array.isArray(data)) {
			return data.find((user) => user.isadmin === true);
		}
		return null;
	}, [data]);

	const { mutate } = useMutation(addAdmin, {
		onSuccess: (res) => {
			toast({
				description: "Admin Successfully Added",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
			setIsModalOpen(false);
			refetch();
		},

		onError: (err: any) => {
			toast({
				description: err.response.data.error,
				status: "error",
				duration: 5000, // Toast will be displayed for 5 seconds
				isClosable: true,
				position: "top-right",
			});
		},
	});

	const formikHook = useFormik({
		initialValues: {
			name: "",
			firstName: "",
			lastName: "",
			password: "",
			isadmin: true,
		},
		onSubmit: (values) => {
			const { firstName } = values;
			const payload = {
				...values,
				name: firstName,
			};
			mutate(payload);
		},
	});

	return {
		formikHook,
		isModalOpen,
		setIsModalOpen,
		isAdminAuthorized,
		adminDataSource,
	};
};
