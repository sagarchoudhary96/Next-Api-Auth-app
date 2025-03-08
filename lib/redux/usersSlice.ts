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

export const fetchUsers = createAsyncThunk<
  FetchActionResponse<User>,
  FetchActionParams
>("users/fetchUsers", async ({ limit, page, filter }: FetchActionParams) => {
  let url = `https://dummyjson.com/users?limit=${limit}&skip=${
    (page - 1) * limit
  }`;

  if (filter?.key && filter?.value) {
    url = `https://dummyjson.com/users/filter?key=${filter.key}&value=${
      filter.value
    }&limit=${limit}&skip=${(page - 1) * limit}`;
  }

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

const usersSlice = createSlice({
  name: "users",
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
