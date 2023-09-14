import { login } from "@/redux/authReducer";
import { loginUser } from "@/services/api/service/auth";
import { ILogin } from "@/types/interfaces";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export const useLoginHandler = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch =useDispatch()

  const { mutate, isLoading: userLoading } = useMutation(loginUser, {
    onSuccess: (res) => {
      toast({
        description: res.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      }),
      dispatch(login(res.data));
        router.push("/");
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

  const formikHook = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
    validationSchema: yup.object().shape({
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
