import { RootState } from "@/lib/redux/store";
import Tooltip from "../Tooltip";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { TablePaginationState } from "@/lib/types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

/**
 * Get Page Numbers for Pagination
 * @param totalPages
 * @param currentPage
 * @returns Array<number | string>
 */
const getPageNumbers = (totalPages: number, currentPage: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  } else {
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }
};

const TablePagination = ({
  entity,
  onUpdatePagination,
}: {
  entity: keyof RootState;
  onUpdatePagination: ActionCreatorWithPayload<TablePaginationState, string>;
}) => {
  const dispatch = useAppDispatch();
  const { pagination, totalPages } = useAppSelector((state) => state[entity]);
  if (!totalPages) return;

  return (
    <div className="flex w-full justify-center items-center mt-2 py-2 gap-2">
      <Tooltip label="Go to prev page">
        <Button
          onClick={() =>
            dispatch(
              onUpdatePagination({
                ...pagination,
                currentPage: Math.max(pagination.currentPage - 1, 1),
              })
            )
          }
          className="bg-blue hover:bg-blue/80 text-black"
          disabled={pagination.currentPage === 1}
        >
          <ChevronLeftIcon />
        </Button>
      </Tooltip>
      {getPageNumbers(totalPages, pagination.currentPage).map((page, index) =>
        page === "..." ? (
          <Button
            key={`${index}-pagination-separator`}
            variant="outline"
            onClick={() =>
              dispatch(
                onUpdatePagination({
                  ...pagination,
                  currentPage:
                    index < 3
                      ? Math.max(pagination.currentPage - 3, 1)
                      : Math.min(pagination.currentPage + 3, totalPages),
                })
              )
            }
          >
            <MoreHorizontalIcon />
          </Button>
        ) : (
          <Button
            key={page}
            variant={pagination.currentPage === page ? "default" : "outline"}
            className={
              pagination.currentPage === page
                ? "bg-blue hover:bg-blue/80 text-black"
                : ""
            }
            onClick={() =>
              dispatch(
                onUpdatePagination({
                  ...pagination,
                  currentPage: Number(page),
                })
              )
            }
          >
            {page}
          </Button>
        )
      )}
      <Tooltip label="Go to next page">
        <Button
          onClick={() =>
            dispatch(
              onUpdatePagination({
                ...pagination,
                currentPage: Math.min(pagination.currentPage + 1, totalPages),
              })
            )
          }
          className="bg-blue hover:bg-blue/80 text-black"
          disabled={pagination.currentPage === totalPages}
        >
          <ChevronRightIcon />
        </Button>
      </Tooltip>
    </div>
  );
};

export default TablePagination;
