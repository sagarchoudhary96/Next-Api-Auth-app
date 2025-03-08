"use client";

import TableView from "@/components/TableView";
import useTableData from "@/hooks/useTableData";
import { USER_TABLE_COLUMNS } from "@/lib/constants";
import { fetchUsers, setFilter, setPagination } from "@/lib/redux/usersSlice";
import { User } from "@/lib/types";

const UsersPage = () => {
  const { isLoading, data } = useTableData<User>(fetchUsers, "users");
  
  return (
    <TableView
      entity="users"
      columns={USER_TABLE_COLUMNS}
      data={data}
      isLoading={isLoading}
      onUpdatePagination={setPagination}
      onUpdateFilter={setFilter}
    />
  );
};

export default UsersPage;
