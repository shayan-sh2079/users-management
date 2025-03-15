"use client";
import ModalWrapper from "@/common/ui/ModalWrapper";
import { ComponentProps } from "react";
import { Statuses, User } from "@/common/types/user";
import Input from "@/common/ui/Input";
import Button from "@/common/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import CustomDatePicker from "@/common/ui/CustomDatePicker";
import { STATUSES } from "@/common/constants/user";
import Select from "@/common/ui/Select";
import DateObject from "react-date-object";

interface Props extends Omit<ComponentProps<typeof ModalWrapper>, "children"> {
  user: User | null;
  onAddUser: (user: Omit<User, "id">) => void;
  onEditUser: (user: User) => void;
}

const schema = z.object({
  name: z.string().min(1, "نام اجباری است"),
  email: z.string().email("فرمت درست نیست"),
  date: z.date({
    required_error: "تاریخ اجباری است",
    invalid_type_error: "یک تاریخ معتبر انتخاب کنید",
  }),
  status: z.string().min(1, "وضعیت اجباری است"),
});

type Inputs = z.infer<typeof schema>;

const UserModal = ({ user, onEditUser, onClose, onAddUser }: Props) => {
  const isEditing = !!user;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      date: user?.registrationDate
        ? new Date(user?.registrationDate)
        : undefined,
      status: user?.status || "",
    },
  });

  const onSubmit = (data: Inputs) => {
    const userData = {
      name: data.name,
      email: data.email,
      registrationDate: data.date.toISOString(),
      status: data.status as Statuses,
    };
    if (isEditing) onEditUser({ id: user!.id, ...userData });
    else onAddUser(userData);
    onClose?.();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        className={"m-4 flex w-80 flex-col gap-4 md:w-150 2xl:w-350"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          labelProps={{ label: "نام", error: errors.name?.message }}
          {...register("name")}
        />
        <Input
          labelProps={{ label: "ایمیل", error: errors.email?.message }}
          {...register("email")}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              calenderProps={{
                value: field.value,
                onChange: (newValue: DateObject) => {
                  field.onChange(newValue.toDate());
                },
              }}
              labelProps={{
                label: "تاریخ ثبت نام",
                error: errors.date?.message,
              }}
            />
          )}
        />
        <Select
          options={STATUSES}
          labelProps={{ label: "وضعیت", error: errors.status?.message }}
          {...register("status")}
        />
        <Button>{isEditing ? "ویرایش کردن" : "اضافه کردن"}</Button>
      </form>
    </ModalWrapper>
  );
};

export default UserModal;
