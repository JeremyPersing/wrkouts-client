import { ComponentPropsWithoutRef } from "react";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  options: number[] | string[];
  selectClassName?: string;
  label?: string;
}

export default function Select({
  label,
  selectClassName,
  className,
  options,
  ...rest
}: SelectProps) {
  return (
    <div className={`form-control ${className}`}>
      {label && <label className="label">{label}</label>}

      <select className={`select select-bordered ${selectClassName}`} {...rest}>
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
