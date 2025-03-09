import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  FetchActionParams,
  FetchActionResponse,
  Filter,
  RequestStatus,
  SliceState,
  TablePaginationState,
  User,
} from "../types";
import { EntityType } from "../constants";

/**
 * Fetch users from the API
 * @param limit - Number of items per page
 * @param page - Current page number
 * @param filter - Filter object
 * @returns Users data and total pages
 */
export const fetchUsers = createAsyncThunk<
  FetchActionResponse<User>,
  FetchActionParams
>("users/fetchUsers", async ({ limit, page, filter }: FetchActionParams) => {
  let url = `https://dummyjson.com/users`;

  if (filter?.key && filter?.value) {
    url += `/filter?key=${filter.key}&value=${filter.value}&`;
  } else {
    url += `?`;
  }

  url += `limit=${limit}&skip=${(page - 1) * limit}`;

  const response = await axios.get(url);
  return {
    data: response.data.users,
    totalPages: Math.ceil(response.data.total / limit),
  };
});

const initialState: SliceState<User> = {
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
 * Users slice to handle users data
 * Contains reducers and extra reducers for fetching users
 * Also contains reducers for setting pagination and filter
 */
const usersSlice = createSlice({
  name: EntityType.Users,
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
      .addCase(fetchUsers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = RequestStatus.Error;
        state.error = action.error.message;
      });
  },
});
export const { setPagination, setFilter } = usersSlice.actions;
export default usersSlice.reducer;
