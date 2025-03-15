import { STATUSES } from "@/common/constants/user";

export type Statuses = (typeof STATUSES)[number]["value"];

export interface User {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  status: Statuses;
}

export type TableHeadersKeys = Exclude<keyof User, "id">;
