import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  createSearchParams,
  URLSearchParamsInit,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AxiosError } from "axios";
import { indexGet } from "../api/req/get";

interface IUseGetProps<T> {
  url: string;
  initialState: T;
  instantFilters: Record<string, string | string[]>;
  conditialFilters?: Record<string, string | string[]>;
  onError?: (status: number, message: string) => void;
  onSuccess?: () => void;
  enabled?: boolean;
  refetchInterval?: number;
  isDisabledCache?: boolean;
}

interface IUseGet<T> {
  data: T;
  filter: () => void;
  clearFilter: () => void;
  timeReload: Date;
}

type IUseGetResponse<T> = Omit<UseQueryResult<T, unknown>, "data"> & IUseGet<T>;

export const useGet = <T>({
  url,
  initialState,
  instantFilters,
  conditialFilters,
  onError,
  onSuccess,
  enabled = true,
  refetchInterval,
  isDisabledCache = false,
}: IUseGetProps<T>): IUseGetResponse<T> => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});

  const memoizedInstantFilters = useMemo(
    () => instantFilters,
    [JSON.stringify(instantFilters)]
  );
  const memoizedConditionalFilters = useMemo(
    () => conditialFilters,
    [JSON.stringify(conditialFilters)]
  );

  const queryKey = [url, JSON.stringify(filters)];

  useEffect(() => {
    const formattedFilters = Object.entries({
      ...filters,
      ...memoizedInstantFilters,
    }).reduce((acc, [key, value]) => {
      if (value === undefined) return acc;
      if (Array.isArray(value)) {
        acc[key] = value.join(",");
      } else {
        acc[key] = Array.isArray(value) ? value.map(String) : String(value);
      }

      return acc;
    }, {} as Record<string, string | string[]>);
    setSearchParams(createSearchParams(formattedFilters));

    const allValidKeys = new Set([
      ...Object.keys(memoizedInstantFilters as Record<string, string>),
      ...(memoizedConditionalFilters
        ? Object.keys(memoizedConditionalFilters)
        : []),
    ]);

    const validatedSearchParams = Object.fromEntries(
      Array.from(searchParams.entries()).filter(([key]) =>
        allValidKeys.has(key)
      )
    );
    setFilters({
      ...validatedSearchParams,
      ...filters,
      ...memoizedInstantFilters,
    });
  }, [memoizedInstantFilters]);

  const filter = () => {
    const formattedFilters = Object.entries({
      ...filters,
      ...memoizedConditionalFilters,
    }).reduce((acc, [key, value]) => {
      if (value === undefined || value === "undefined") return acc;
      if (Array.isArray(value)) {
        acc[key] = value.join(",");
      } else {
        acc[key] = Array.isArray(value) ? value.map(String) : String(value);
      }

      return acc;
    }, {} as Record<string, string | string[]>);

    setFilters({ ...filters, ...memoizedConditionalFilters });
    setSearchParams(createSearchParams(formattedFilters));
  };

  const clearFilter = () => {
    setFilters({ ...memoizedInstantFilters });
    setSearchParams({});
  };

  const queryFn = () => {
    const newFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined)
    );
    return indexGet({
      url,
      query: newFilters as URLSearchParamsInit,
      onError,
      onSuccess,
    });
  };

  const throwOnError = (
    error: AxiosError<{ message: string }>,
    query: { reset: () => void }
  ) => {
    if (onError) {
      onError(
        error.response?.status as number,
        error.response?.data.message as string
      );
    }
    query.reset();
    return false;
  };

  const retry = (failureCount: number) => {
    if (failureCount < 2) {
      return true;
    } else {
      return false;
    }
  };

  const response = useQuery({
    enabled,
    queryKey,
    queryFn,
    throwOnError,
    retry,
    ...(refetchInterval && { refetchInterval }),
    ...(isDisabledCache && { gcTime: 0, refetchOnMount: true }),
  });

  return {
    ...response,
    data: { ...initialState, ...response.data } as T,
    clearFilter,
    filter,
    timeReload: new Date(),
  };
};
