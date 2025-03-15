import { ComponentProps } from "react";

const Button = ({ className, ...props }: ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={
        "text-md cursor-pointer rounded-lg border border-blue-500 px-3 py-1.5 font-semibold text-blue-500 hover:bg-blue-400/20 active:bg-blue-400/50 disabled:border-gray-500 disabled:bg-transparent disabled:text-gray-500 " +
        " " +
        className
      }
    />
  );
};

export default Button;
