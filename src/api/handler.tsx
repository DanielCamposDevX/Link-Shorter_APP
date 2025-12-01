import { AxiosRequestConfig } from "axios";
import { createSearchParams, URLSearchParamsInit } from "react-router-dom";
import { api } from ".";

export class CustomError extends Error {
  public data: unknown;

  constructor(message: string, data: unknown) {
    super(message);
    this.data = data;
  }
}

const methods = {
  post: api.post,
  get: api.get,
  put: api.put,
  delete: api.delete,
};

type HandleApiRequestParams = {
  url: string;
  body?: object;
  method: keyof typeof methods;
  query?: URLSearchParamsInit;
  config?: AxiosRequestConfig;
  onSuccess?: () => void;
  onError?: (status: number, message: string) => void;
};

const toast = () => {};

export const handleReq = async ({
  url,
  body,
  method,
  query,
  config,
}: HandleApiRequestParams) => {
  let composeUrl = url;
  composeUrl = query
    ? `${composeUrl}?${createSearchParams(
        Object.fromEntries(
          Object.entries(query).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(",") : value,
          ])
        )
      ).toString()}`
    : composeUrl;

  if (method === "get" && body) {
    throw new Error("Body is not allowed in get method");
  }

  const response = await methods[method](composeUrl, body, config)
    .then((res) => {
      const data = res?.data;

      return data;
    })
    .catch(async (err) => {
      const res = err?.response?.data;
      const status = err?.response?.status;

      if (status === 401) {
        toast();
      }
      throw new CustomError(status, res);
    });
  return response;
};
