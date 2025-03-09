"use client";

import TableView from "@/components/TableView";
import { Button } from "@/components/ui/button";
import useTableData from "@/hooks/useTableData";
import {
  EntityType,
  PRODUCT_FILTERS,
  PRODUCT_TABLE_COLUMNS,
} from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchProducts,
  setFilter,
  setPagination,
} from "@/lib/redux/productsSlice";
import { Product } from "@/lib/types";
import clsx from "clsx";

const ProductsPage = () => {
  const { isLoading, data } = useTableData<Product>(
    fetchProducts,
    EntityType.Products
  );
  const { filter } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const isLaptopCategory =
    filter.value === "laptops" && filter.key === "category";

  // don't show category filter if laptop category is selected
  const finalFilters = isLaptopCategory
    ? PRODUCT_FILTERS.filter((f) => f.key !== "category")
    : PRODUCT_FILTERS;

  return (
    <>
      <div className="flex items-center gap-1 rounded-lg p-2 bg-gray w-fit mb-2">
        <Button
          variant={isLaptopCategory ? "ghost" : "default"}
          className={clsx(
            "text-black font-semibold text-lg",
            !isLaptopCategory && "bg-blue hover:bg-blue/80"
          )}
          onClick={() => dispatch(setFilter({ key: "", value: "" }))}
        >
          All
        </Button>
        <Button
          variant={isLaptopCategory ? "default" : "ghost"}
          className={clsx(
            "text-black font-semibold text-lg",
            isLaptopCategory && "bg-blue hover:bg-blue/80 "
          )}
          onClick={() =>
            dispatch(setFilter({ key: "category", value: "laptops" }))
          }
        >
          Laptops
        </Button>
      </div>
      <TableView
        entity={EntityType.Products}
        columns={PRODUCT_TABLE_COLUMNS}
        filters={finalFilters}
        data={data}
        isLoading={isLoading}
        onUpdatePagination={setPagination}
        onUpdateFilter={setFilter}
      />
    </>
  );
};

export default ProductsPage;
