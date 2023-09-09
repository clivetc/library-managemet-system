import { loginUser } from "@/services/api/requests/auth";
import { ILogin } from "@/types/interfaces";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as yup from "yup";

export const useLoginHandler = () => {
  const { mutate, isLoading: userLoading } = useMutation(loginUser);

  const formikHook = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log({ values });
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
