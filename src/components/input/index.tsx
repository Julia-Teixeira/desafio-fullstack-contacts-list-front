import { InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type: string;
  width: string;
  register: UseFormRegisterReturn;
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export default function Input({
  id,
  label,
  type,
  width,
  register,
  error,
  ...rest
}: InputProps) {
  return (
    <fieldset className="flex flex-col">
      <label htmlFor={id} className="font-semibold font-1xl">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        className={`${width} h-[50px] rounded-md text-purple800 pl-4`}
        {...rest}
        {...register}
      />
      {error && typeof error === "string" ? (
        <span className="text-red-700">{error}</span>
      ) : null}
    </fieldset>
  );
}
