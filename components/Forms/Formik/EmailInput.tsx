import { FormikValues } from "formik";

import FormikErrors from "./FormikErrors";
import { getFormikFieldErrors } from "@/utils/getFormikFieldErrors";
import { Input } from "@/components/Input";

export default function EmailInput({
  formik,
  fieldName,
}: {
  formik: FormikValues;
  fieldName: string;
}) {
  return (
    <div className="mb-5">
      <Input
        label="Email"
        type="email"
        placeholder="Email Address"
        className={
          getFormikFieldErrors({ formik, fieldName }) ? "input-error" : ""
        }
        autoComplete="email"
        {...formik.getFieldProps(fieldName)}
      />
      <FormikErrors fieldName={fieldName} formik={formik} />
    </div>
  );
}
