import { useFormik } from "formik";

interface IFormik {
  email: string;
  passsword: string;
  confirm_password: string;
}

export const useRegisterHandler = () => {
  const formikHook = useFormik<IFormik>({
    initialValues: {
      email: "",
      passsword: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  return { formikHook };
};
