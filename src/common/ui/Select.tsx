import { ComponentProps } from "react";
import Label from "@/common/ui/Label";

interface Props extends ComponentProps<"select"> {
  options: Readonly<{ text: string; value: string }[]>;
  labelProps: Omit<ComponentProps<typeof Label>, "children">;
}

const Select = ({ options, labelProps, className, ...props }: Props) => {
  return (
    <Label {...labelProps}>
      <select
        className={
          "rounded border border-blue-300 px-3 py-2 outline-none focus:border-blue-500 " +
          className
        }
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </Label>
  );
};

export default Select;
