"use client";

import TableView from "@/components/TableView";
import useTableData from "@/hooks/useTableData";
import { EntityType, USER_FILTERS, USER_TABLE_COLUMNS } from "@/lib/constants";
import { fetchUsers, setFilter, setPagination } from "@/lib/redux/usersSlice";
import { User } from "@/lib/types";

const UsersPage = () => {
  const { isLoading, data } = useTableData<User>(fetchUsers, EntityType.Users);
  
  return (
    <TableView
      entity={EntityType.Users}
      columns={USER_TABLE_COLUMNS}
      filters={USER_FILTERS}
      data={data}
      isLoading={isLoading}
      onUpdatePagination={setPagination}
      onUpdateFilter={setFilter}
    />
  );
};

export default UsersPage;
