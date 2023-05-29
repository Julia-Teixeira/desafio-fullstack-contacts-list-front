import { ButtonHTMLAttributes } from "react";
import ReactLoading from "react-loading";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type: "submit" | "button";
  children?: React.ReactNode;
  color?: string;
  func?: void;
  w: string;
  loading?: boolean;
}
export default function Button({
  text,
  type,
  children,
  color,
  w,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex items-center justify-evenly text-2xl ${w} h-[50px] ${color} rounded-md text-white`}
      {...rest}
    >
      {children}
      {loading === true ? (
        <ReactLoading
          type="bubbles"
          color="white"
          height={"20px"}
          width={"20px"}
        />
      ) : (
        text
      )}
    </button>
  );
}
