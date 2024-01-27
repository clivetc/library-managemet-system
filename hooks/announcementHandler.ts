import { RootState } from "@/redux/store";
import {
	createAnnouncement,
	getAllAnnouncements,
} from "@/services/api/service/announcements";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface IValues {
	title: string;
	description: string;
	category: string;
	date: string;
}

export const useAnnouncements = () => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = useSelector((settings: RootState) => settings.auth.user);
	const isAuthorized = useSelector(
		(state: RootState) => state.auth.isAuthorized,
	);

	const {
		data: announcementData,
		refetch: refetchAnnouncement,
		isFetching: isFetchingAnnouncements,
	} = useQuery("announcements", getAllAnnouncements, {
		refetchOnMount: false,
		enabled: !!user && isAuthorized,
	});

	const { mutate, isLoading } = useMutation(createAnnouncement, {
		onSuccess: (res) => {
			toast({
				description: res.message,
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
			onClose();
			refetchAnnouncement();
		},

		onError: (err: any) => {
			toast({
				description: err.response.data.error,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
		},
	});

	const formikAccHook = useFormik<IValues>({
		initialValues: {
			title: "",
			description: "",
			category: "",
			date: "",
		},
		onSubmit: (values) => {
			mutate(values);
		},
		validationSchema: yup.object().shape({
			title: yup.string().required("Email is required"),
			description: yup.string().required("Email is required"),
			category: yup.string().required("Email is required"),
			date: yup.string().required("Email is required"),
		}),
	});
	return {
		formikAccHook,
		isLoading,
		isOpen,
		onOpen,
		announcementData,
		onClose,
	};
};
