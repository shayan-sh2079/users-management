import { ComponentProps } from "react";
import DatePicker from "react-multi-date-picker";
import Label from "@/common/ui/Label";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface Props {
  labelProps: Omit<ComponentProps<typeof Label>, "children">;
  calenderProps: ComponentProps<typeof DatePicker>;
}

const CustomDatePicker = (props: Props) => {
  return (
    <Label {...props.labelProps}>
      <DatePicker
        {...props.calenderProps}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        inputClass={
          "rounded w-full border border-blue-300 px-3 py-2 outline-none focus:border-blue-500"
        }
      />
    </Label>
  );
};

export default CustomDatePicker;
