import { User } from "@/common/types/user";

export const USERS: User[] = [
  {
    id: 1,
    name: "user1",
    email: "user1@gmail.com",
    registrationDate: new Date(2025, 2).toISOString(),
    status: "active",
  },
  {
    id: 2,
    name: "user2",
    email: "user2@gmail.com",
    registrationDate: new Date(2023, 5).toISOString(),
    status: "active",
  },
  {
    id: 3,
    name: "user3",
    email: "user3@gmail.com",
    registrationDate: new Date(2024, 6).toISOString(),
    status: "inactive",
  },
];
