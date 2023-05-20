import { FormikValues } from "formik";

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
        autoComplete="email"
        fieldName={fieldName}
        formik={formik}
      />
    </div>
  );
}
