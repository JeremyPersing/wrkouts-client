import { FormikValues } from "formik";

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
        fieldName={fieldName}
        formik={formik}
        {...formik.getFieldProps(fieldName)}
      />
    </div>
  );
}
