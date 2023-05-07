import { FormikValues } from "formik";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { getFormikFieldErrors } from "../../../utils/getFormikFieldErrors";
import FormikErrors from "./FormikErrors";
import { Input } from "@/components/Input";

export default function PasswordInput({
  formik,
  fieldName,
  label = "Password",
  placeholder = "Password",
}: {
  formik: FormikValues;
  fieldName: string;
  label?: string;
  placeholder?: string;
}) {
  const [passwordShown, setPasswordShown] = useState(false);

  const handleEyeClicked = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="mb-5">
      <div className="relative">
        <Input
          label={label}
          type={passwordShown ? "text" : "password"}
          placeholder={placeholder}
          inputClassName={
            getFormikFieldErrors({ formik, fieldName }) ? "input-error" : ""
          }
          autoComplete="password"
          {...formik.getFieldProps(fieldName)}
        />

        <div className="absolute bottom-4 right-4">
          {passwordShown ? (
            <HiEye onClick={handleEyeClicked} className={"cursor-pointer"} />
          ) : (
            <HiEyeOff onClick={handleEyeClicked} className={"cursor-pointer"} />
          )}
        </div>
      </div>
      <FormikErrors fieldName={fieldName} formik={formik} />
    </div>
  );
}
