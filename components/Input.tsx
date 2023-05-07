import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  inputClassName?: string;
}

export const Input = ({
  type,
  placeholder,
  label,
  className,
  inputClassName,
  ...rest
}: InputProps) => {
  return (
    <div className={`form-control w-full max-w-xs ${className}`}>
      {label && <label className="label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full px-4 py-2 ${inputClassName}`}
        {...rest}
      />
    </div>
  );
};
