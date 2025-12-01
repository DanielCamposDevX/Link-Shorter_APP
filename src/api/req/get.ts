import { URLSearchParamsInit } from "react-router-dom";
import { handleReq } from "../handler";

interface IindexGet {
  url: string;
  query?: URLSearchParamsInit;
  onError?: (status: number, message: string) => void;
  onSuccess?: () => void;
}

export const indexGet = async ({
  url,
  query,
  onError,
  onSuccess,
}: IindexGet) => {
  return handleReq({
    method: "get",
    url,
    query,
    onSuccess,
    onError,
  });
};
