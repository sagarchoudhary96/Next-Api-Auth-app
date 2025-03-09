import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  FetchActionParams,
  FetchActionResponse,
  Filter,
  Product,
  RequestStatus,
  SliceState,
  TablePaginationState,
} from "../types";
import { EntityType } from "../constants";

/**
 * Fetch products from the API
 * @param limit - Number of items per page
 * @param page - Current page number
 * @param filter - Filter object
 * @returns Products data and total pages
 */
export const fetchProducts = createAsyncThunk<
  FetchActionResponse<Product>,
  FetchActionParams
>(
  "products/fetchProducts",
  async ({ limit, page, filter }: FetchActionParams) => {
    let url = `https://dummyjson.com/products`;

    if (filter?.key && filter?.value) {
      if (filter.key === "category") {
        // for category filter using the category api
        url += `/category/${filter.value}?`;
      } else {
        // using search query for other filters as filters api not present for products
        url += `/search?q=${filter.value}&`;
      }
    } else {
      url += `?`;
    }

    url += `limit=${limit}&skip=${(page - 1) * limit}`;

    const response = await axios.get(url);
    return {
      data: response.data.products,
      totalPages: Math.ceil(response.data.total / limit),
    };
  }
);

const initialState: SliceState<Product> = {
  data: [],
  totalPages: 1,
  status: RequestStatus.Idle,
  error: null,
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  filter: {
    key: "",
    value: "",
  },
};

/**
 * Products slice to handle products data
 * Contains reducers and extra reducers for fetching products
 * Also contains reducers for setting pagination and filter
 */
const productsSlice = createSlice({
  name: EntityType.Products,
  initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<TablePaginationState>) => {
      state.pagination = action.payload;
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = RequestStatus.Error;
        state.error = action.error.message;
      });
  },
});
export const { setPagination, setFilter } = productsSlice.actions;
export default productsSlice.reducer;
