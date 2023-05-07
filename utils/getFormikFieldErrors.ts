import { FormikValues } from "formik";

export const getFormikFieldErrors = ({
  formik,
  fieldName,
}: {
  formik: FormikValues;
  fieldName: string;
}) => {
  if (formik.touched[fieldName] && formik.errors[fieldName])
    return formik.errors[fieldName];
  return null;
};
