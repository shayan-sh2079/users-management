import { STATUSES, TABLE_HEADERS } from "@/common/constants/user";
import { format } from "date-fns-jalali";
import { memo, useCallback, useMemo, useState } from "react";
import { TableHeadersKeys, User } from "@/common/types/user";
import Button from "@/common/ui/Button";

interface Props {
  users: User[];
  search: string;
  onEdit: (user: User) => void;
}

const UsersTable = ({ users, search, onEdit }: Props) => {
  const [sort, setSort] = useState<{
    key: TableHeadersKeys;
    ascending: boolean;
  }>({ key: "name", ascending: false });

  const handleSorting = useCallback((sortKey: TableHeadersKeys) => {
    setSort((prev) => {
      if (prev.key !== sortKey) {
        return {
          key: sortKey,
          ascending: false,
        };
      }
      return {
        key: sortKey,
        ascending: !prev.ascending,
      };
    });
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    const sortedUsers = structuredClone(users);
    const sortFactor = sort.ascending ? 1 : -1;

    sortedUsers.sort((a, b) => {
      if (sort.key === "registrationDate") {
        return (
          (new Date(a[sort.key]).getTime() - new Date(b[sort.key]).getTime()) *
          sortFactor
        );
      }
      return (
        a[sort.key].toString().localeCompare(b[sort.key].toString(), "en", {
          numeric: true,
        }) * sortFactor
      );
    });

    if (search)
      return sortedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    return sortedUsers;
  }, [sort, users, search]);

  return (
    <div className={"overflow-auto"}>
      <table className="w-full min-w-200 border-separate rounded-md">
        <thead>
          <tr className="[&>th]:rounded-md [&>th]:bg-blue-300/50">
            {TABLE_HEADERS.map((header) => (
              <th
                key={header.value}
                className="p-2"
                onClick={() => handleSorting(header.value)}
              >
                {header.text}{" "}
                {sort.key === header.value && (sort.ascending ? "▲" : "▼")}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedUsers.map((user, idx) => (
            <tr
              key={user.id}
              className={
                idx % 2 === 0
                  ? "bg-white text-center shadow"
                  : "bg-gray-900/5 text-center shadow"
              }
            >
              <td className="text-text w-100 p-2 text-sm">{user.name}</td>
              <td className="text-text p-2 text-sm">{user.email}</td>
              <td className="text-text w-50 p-2 text-sm">
                {format(user.registrationDate, "yyyy/MM/dd")}
              </td>
              <td className="text-text w-30 p-2 text-sm">
                {STATUSES.find((status) => status.value === user.status)!.text}
              </td>
              <td className={"w-40 py-2"}>
                <Button onClick={() => onEdit(user)}>ویرایش</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(UsersTable);
