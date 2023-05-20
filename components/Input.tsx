import { FormikValues } from "formik";
import { ComponentPropsWithoutRef } from "react";
import FormikErrors from "./Forms/Formik/FormikErrors";
import { getFormikFieldErrors } from "@/utils/getFormikFieldErrors";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  inputClassName?: string;
  fieldName?: string;
  formik?: FormikValues;
}

export const Input = ({
  type,
  placeholder,
  label,
  className,
  inputClassName,
  formik,
  fieldName,
  ...rest
}: InputProps) => {
  return (
    <div className={`form-control w-full ${className}`}>
      {label && <label className="label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full px-4 py-2 ${inputClassName}
        ${
          formik && fieldName && getFormikFieldErrors({ formik, fieldName })
            ? "input-error"
            : ""
        }
        `}
        {...(formik && fieldName && { ...formik.getFieldProps(fieldName) })}
        {...rest}
      />

      {formik && fieldName && (
        <FormikErrors formik={formik} fieldName={fieldName} />
      )}
    </div>
  );
};
