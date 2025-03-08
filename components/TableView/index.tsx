import TableControls from "@/components/TableControls";
import { RootState } from "@/lib/redux/store";
import { Filter, TableColumn, TablePaginationState } from "@/lib/types";
import { searchValueInRow } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TablePagination from "./Pagination";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

// Define a generic type for data field which can be passed when TableView component is called
type TableViewProps<T extends { id: string | number }> = {
  columns: TableColumn<T>[];
  data: T[];
  entity: keyof RootState;
  isLoading?: boolean;
  onUpdatePagination: ActionCreatorWithPayload<TablePaginationState, string>;
  onUpdateFilter: ActionCreatorWithPayload<Filter, string>;
};
const TableView = <T extends { id: string | number }>({
  columns,
  data,
  entity,
  isLoading,
  onUpdateFilter,
  onUpdatePagination,
}: TableViewProps<T>) => {
  // for client side filtering
  const [search, setSearch] = useState("");

  const filteredData = data.filter((row) => searchValueInRow(search, row));
  return (
    <div className="flex flex-col flex-1 overflow-hidden gap-2">
      <TableControls
        entity={entity}
        searchValue={search}
        onSearchChange={setSearch}
        onUpdateFilter={onUpdateFilter}
        onUpdatePagination={onUpdatePagination}
      />
      <div className="flex-1 w-full overflow-auto relative">
        <Table className="border">
          <TableHeader className="sticky top-0 bg-blue z-10">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  className="border text-foreground font-bold text-center py-1"
                  key={String(column.key)}
                  scope="col"
                >
                  {column.title.toUpperCase()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!filteredData.length && !isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}

            {filteredData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    className="border font-semibold"
                    key={`${row.id}-${String(column.key)}`}
                  >
                    {String(row[column.key]) || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
      </div>
      <TablePagination entity={entity} onUpdatePagination={onUpdatePagination} />
    </div>
  );
};

export default TableView;
