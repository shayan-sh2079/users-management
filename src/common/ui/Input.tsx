import { ComponentProps } from "react";
import Label from "@/common/ui/Label";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelProps: Omit<ComponentProps<typeof Label>, "children">;
}

const Input = ({ labelProps, className, ...props }: Props) => {
  return (
    <Label {...labelProps}>
      <input
        className={
          "rounded border border-blue-300 px-3 py-2 outline-none focus:border-blue-500 " +
          className
        }
        type="text"
        {...props}
      />
    </Label>
  );
};

export default Input;
