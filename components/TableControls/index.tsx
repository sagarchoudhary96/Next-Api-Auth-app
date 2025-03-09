import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TableSearch from "./Search";
import { Filter, TableFilterType, TablePaginationState } from "@/lib/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import TableFilters from "./Filters";

const TableControls = ({
  entity,
  searchValue,
  onSearchChange,
  onUpdatePagination,
  onUpdateFilter,
  filters,
}: {
  entity: keyof RootState;
  searchValue: string;
  filters: TableFilterType[];
  onSearchChange: (value: string) => void;
  onUpdatePagination: ActionCreatorWithPayload<TablePaginationState, string>;
  onUpdateFilter: ActionCreatorWithPayload<Filter, string>;
}) => {
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector((state) => state[entity]);
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="items-center flex gap-2 p-1">
        <Select
          value={`${pagination.pageSize}`}
          onValueChange={(value) =>
            dispatch(
              onUpdatePagination({ currentPage: 1, pageSize: parseInt(value) })
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm font-semibold whitespace-nowrap">Entries</span>
      </div>
      <TableSearch value={searchValue} onChange={onSearchChange} />
      {!!filters.length && (
        <TableFilters
          entity={entity}
          filters={filters}
          onUpdateFilter={onUpdateFilter}
        />
      )}
    </div>
  );
};

export default TableControls;
