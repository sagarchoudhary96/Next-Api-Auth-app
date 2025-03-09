"use client";

import TableView from "@/components/TableView";
import useTableData from "@/hooks/useTableData";
import { EntityType, PRODUCT_FILTERS, PRODUCT_TABLE_COLUMNS } from "@/lib/constants";
import {
  fetchProducts,
  setFilter,
  setPagination,
} from "@/lib/redux/productsSlice";
import { Product } from "@/lib/types";

const ProductsPage = () => {
  const { isLoading, data } = useTableData<Product>(
    fetchProducts,
    EntityType.Products
  );

  return (
    <TableView
      entity={EntityType.Products}
      columns={PRODUCT_TABLE_COLUMNS}
      filters={PRODUCT_FILTERS}
      data={data}
      isLoading={isLoading}
      onUpdatePagination={setPagination}
      onUpdateFilter={setFilter}
    />
  );
};

export default ProductsPage;
