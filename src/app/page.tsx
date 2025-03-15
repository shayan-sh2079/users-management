"use client";
import { useCallback, useState } from "react";
import { User } from "@/common/types/user";
import { USERS } from "@/common/constants/fakeData";
import Button from "@/common/ui/Button";
import { generateNewId } from "@/common/utils/common";
import Input from "@/common/ui/Input";
import useDebouncedValue from "@/common/hooks/useDebouncedValue";
import UsersTable from "@/app/UsersTable";
import dynamic from "next/dynamic";
import ModalLoading from "@/common/ui/ModalLoading";

const UserModalDynamic = dynamic(() => import("@/app/UserModal"), {
  ssr: false,
  loading: ModalLoading,
});

export default function Home() {
  const [users, setUsers] = useState<User[]>(USERS);
  const [userModal, setUserModal] = useState<{
    isOpen: boolean;
    selectedUser: User | null;
  }>({ isOpen: false, selectedUser: null });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const onEditClick = useCallback((user: User) => {
    setUserModal({ isOpen: true, selectedUser: user });
  }, []);

  const onAddUser = (data: Omit<User, "id">) => {
    setUsers((prev) => [...prev, { id: generateNewId(prev, "id"), ...data }]);
  };

  const onEditUser = (data: User) => {
    setUsers((prev) => {
      const newUsers = structuredClone(prev);
      const idx = newUsers.findIndex((user) => user.id === data.id);
      newUsers[idx] = data;
      return newUsers;
    });
  };

  return (
    <>
      <div className={"m-5 mx-auto flex max-w-7xl flex-col gap-8"}>
        <Button
          onClick={() => setUserModal({ isOpen: true, selectedUser: null })}
        >
          اضافه کردن کاربر
        </Button>
        <Input
          labelProps={{ label: "جستجو" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <UsersTable
          users={users}
          search={debouncedSearch}
          onEdit={onEditClick}
        />
      </div>
      {userModal.isOpen && (
        <UserModalDynamic
          onClose={() => setUserModal({ isOpen: false, selectedUser: null })}
          user={userModal.selectedUser}
          onAddUser={onAddUser}
          onEditUser={onEditUser}
        />
      )}
    </>
  );
}
