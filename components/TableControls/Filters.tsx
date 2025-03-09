import { RootState } from "@/lib/redux/store";
import { Filter, FilterTypes, TableFilterType } from "@/lib/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { debounce } from "@/lib/utils";
import { Button } from "../ui/button";

type TableFiltersProps = {
  entity: keyof RootState;
  filters: TableFilterType[];
  onUpdateFilter: ActionCreatorWithPayload<Filter, string>;
};
const TableFilters = ({
  entity,
  filters,
  onUpdateFilter,
}: TableFiltersProps) => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state[entity]);

  const debouncedFilterUpdate = debounce((updatedValues: Filter) => {
    dispatch(onUpdateFilter(updatedValues));
  }, 1000);
  return (
    <div className="flex items-center gap-3">
      {filters.map((filterConfig) =>
        filterConfig.type === FilterTypes.SELECT ? (
          <Select
            key={filterConfig.key}
            value={filterConfig.key === filter.key ? filter.value : ""}
            onValueChange={(value) =>
              dispatch(onUpdateFilter({ key: filterConfig.key, value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={filterConfig.label} />
            </SelectTrigger>
            <SelectContent>
              {filterConfig.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Popover key={filterConfig.key}>
            <PopoverTrigger className="cursor-pointer whitespace-nowrap text-black font-semibold flex items-center gap-1">
              {filterConfig.label}
              <ChevronDown className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent>
              <Input
                defaultValue={
                  filterConfig.key === filter.key ? filter.value : ""
                }
                placeholder={`Search ${filterConfig.label}`}
                onChange={(e) =>
                  debouncedFilterUpdate({
                    key: filterConfig.key,
                    value: e.target.value,
                  })
                }
              />
            </PopoverContent>
          </Popover>
        )
      )}
      {!!(filter.key && filter.value) && (
        <Button
          variant="link"
          size="sm"
          className="font-semibold"
          onClick={() => dispatch(onUpdateFilter({ key: "", value: "" }))}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default TableFilters;
