import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type: "submit" | "button";
  children?: React.ReactNode;
  color?: string;
  func?: void;
  w: string;
}
export default function Button({
  text,
  type,
  children,
  color,
  w,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex items-center  justify-evenly text-2xl ${w} h-[50px] bg-[${color}] rounded-md text-white`}
      {...rest}
    >
      {children} {text}
    </button>
  );
}
