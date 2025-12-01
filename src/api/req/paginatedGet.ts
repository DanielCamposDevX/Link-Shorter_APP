import { URLSearchParamsInit } from "react-router-dom";
import { handleReq } from "../handler";

export const index = async (url: string, query: URLSearchParamsInit) =>
  handleReq({
    method: "get",
    url,
    query,
  });
