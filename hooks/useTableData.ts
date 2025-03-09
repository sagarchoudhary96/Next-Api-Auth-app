import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  FetchActionParams,
  FetchActionResponse,
  RequestStatus,
} from "@/lib/types";
import { useEffect } from "react";

import { RootState } from "@/lib/redux/store";
import { AsyncThunkAction } from "@reduxjs/toolkit";

/**
 *
 * @param fetchAction  Fetch action to fetch data from the API
 * @param sliceName  Slice name to get the data from the redux store
 * @returns
 * isLoading - Loading status of the data
 * data - Data fetched from the API
 * error - Error message if any
 */
const useTableData = <T>(
  fetchAction: (
    params: FetchActionParams
  ) => AsyncThunkAction<FetchActionResponse<T>, FetchActionParams, object>,
  sliceName: keyof RootState
) => {
  const dispatch = useAppDispatch();
  const { data, status, error, pagination, filter } = useAppSelector(
    (state) => state[sliceName]
  );
  const isLoading = [RequestStatus.Idle, RequestStatus.Loading].includes(
    status
  );

  useEffect(() => {
    dispatch(
      fetchAction({
        limit: pagination.pageSize,
        page: pagination.currentPage,
        filter,
      })
    );
  }, [dispatch, fetchAction, pagination, filter]);

  return {
    isLoading,
    data: data as T[],
    error,
  };
};

export default useTableData;
