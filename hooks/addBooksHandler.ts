import { useFormik } from "formik";

interface IFormik {
  title: string;
  image: string;
  description: string;
}

export const useAddBooksHandler = () => {
  const formik = useFormik<IFormik>({
    initialValues: {
      title: "",
      image: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  return { formik };
};
