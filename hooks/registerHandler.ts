import { IRegister } from "@/types/interfaces";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import * as yup from "yup";
import { registerUser } from "@/services/api/service/auth";

export const useRegisterHandler = () => {
	const router = useRouter();
	const toast = useToast();

	const { mutate, isLoading: userLoading } = useMutation(registerUser, {
		onSuccess: (res: any) => {
			toast({
				description: "Account Successfully Created Please Login",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			}),
				router.push("/users/auth/login");
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

	const formikHook = useFormik<IRegister>({
		initialValues: {
			name: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			isAdmin: false,
		},
		onSubmit: (values) => {
			mutate(values);
		},
		validationSchema: yup.object().shape({
			name: yup.string().required("UserName is required"),
			firstName: yup.string().required("First Name is required"),
			lastName: yup.string().required("Last Name is required"),
			email: yup
				.string()
				.email("Invalid email address")
				.required("Email is required"),
			password: yup
				.string()
				.required("Password is required")
				.min(8, "Password must be at least 8 characters long"),
		}),
	});
	return { formikHook, userLoading };
};
