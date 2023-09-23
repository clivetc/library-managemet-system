import { loginAdmin } from "@/redux/slice/adminAuthReducer";
import { adminLogin } from "@/services/api/service/auth";
import { ILoginAdmin } from "@/types/interfaces";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export const useAdminLoginHandler = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();

  const { mutate, isLoading: userLoading } = useMutation(adminLogin, {
    onSuccess: (res) => {
      toast({
        description: res.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      }),
        router.replace("/");
      dispatch(loginAdmin(res.data));
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

  const formikHook = useFormik<ILoginAdmin>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
    validationSchema: yup.object().shape({
      username: yup
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
