import { TableHeadersKeys } from "@/common/types/user";

export const STATUSES = [
  {
    text: "فعال",
    value: "active",
  },
  {
    text: "غیر فعال",
    value: "inactive",
  },
] as const;

export const TABLE_HEADERS: { text: string; value: TableHeadersKeys }[] = [
  {
    text: "نام",
    value: "name",
  },
  {
    text: "ایمیل",
    value: "email",
  },
  {
    text: "تاریخ ثبت نام",
    value: "registrationDate",
  },
  {
    text: "وضعیت",
    value: "status",
  },
];
