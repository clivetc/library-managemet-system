import { useFormik } from "formik";

interface IFormik {
  email: string;
  passsword: string;
}

export const useLoginHandler = () => {
  const formikHook = useFormik<IFormik>({
    initialValues: {
      email: "",
      passsword: "",
    },
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  return { formikHook };
};
