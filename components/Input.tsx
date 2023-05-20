import { FormikValues } from "formik";
import { ComponentPropsWithoutRef } from "react";
import FormikErrors from "./Forms/Formik/FormikErrors";
import { getFormikFieldErrors } from "@/utils/getFormikFieldErrors";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  inputClassName?: string;
  fieldName?: string;
  formik?: FormikValues;
  showErrors?: boolean;
}

export const Input = ({
  type,
  placeholder,
  label,
  className,
  inputClassName,
  formik,
  fieldName,
  showErrors = true,
  ...rest
}: InputProps) => {
  return (
    <div className={`form-control ${className}`}>
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

      {formik && fieldName && showErrors && (
        <FormikErrors formik={formik} fieldName={fieldName} />
      )}
    </div>
  );
};
