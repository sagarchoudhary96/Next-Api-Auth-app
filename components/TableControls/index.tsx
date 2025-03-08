import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { setPagination } from "@/lib/redux/usersSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TableSearch from "./Search";

const TableControls = ({
  entity,
  searchValue,
  onSearchChange,
}: {
  entity: keyof RootState;
  searchValue: string;
  onSearchChange: (value: string) => void;
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
              setPagination({ currentPage: 1, pageSize: parseInt(value) })
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
    </div>
  );
};

export default TableControls;
