import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  FetchActionParams,
  FetchActionResponse,
  RequestStatus,
} from "@/lib/types";
import { useEffect } from "react";

import { RootState } from "@/lib/redux/store";
import { AsyncThunkAction } from "@reduxjs/toolkit";

const useTableData = <T>(
  fetchAction: (
    params: FetchActionParams
  ) => AsyncThunkAction<FetchActionResponse<T>, FetchActionParams, object>,
  sliceName: keyof RootState
) => {
  const dispatch = useAppDispatch();
  const { data, status, error, pagination } = useAppSelector(
    (state) => state[sliceName]
  );
  const isLoading = [RequestStatus.Idle, RequestStatus.Loading].includes(
    status
  );

  useEffect(() => {
    dispatch(
      fetchAction({ limit: pagination.pageSize, page: pagination.currentPage })
    );
  }, [dispatch, fetchAction, pagination]);

  return {
    isLoading,
    data: data as T[],
    error,
  };
};

export default useTableData;
