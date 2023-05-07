import { FormikValues } from "formik";

export default function FormikErrors({
  formik,
  fieldName,
  className,
}: {
  formik: FormikValues;
  fieldName: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {formik.touched[fieldName] && formik.errors[fieldName] ? (
        <p className="text-sm text-error">{formik.errors[fieldName]}</p>
      ) : null}
    </div>
  );
}
