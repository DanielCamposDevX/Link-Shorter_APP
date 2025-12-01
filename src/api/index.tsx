import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

interface StoredUser {
  company_id: string;
  [key: string]: unknown;
}

interface ErrorResponseData {
  message?: string;
  [key: string]: unknown;
}

interface RefreshResponse {
  token: string;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

function getStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem("@Link_Shorter:user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getTokens() {
  return {
    token: localStorage.getItem("@Link_Shorter:token"),
    refreshToken: localStorage.getItem("@Link_Shorter:refresh_token"),
  };
}

function logout() {
  window.dispatchEvent(new Event("logout"));
}

function applyNewToken(api: AxiosInstance, token: string) {
  api.defaults.headers.authorization = `Bearer ${token}`;
  localStorage.setItem("@Link_Shorter:token", token);
}

const user = getStoredUser();

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    company_id: user?.company_id ?? "",
  },
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ErrorResponseData>) => {
    const { refreshToken } = getTokens();
    const originalRequest = error.config as AxiosRequestConfig;

    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401 && message === "Invalid JWT token") {
      logout();
      return Promise.reject(error);
    }

    if (
      status === 401 &&
      message === "JWT expired" &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post<RefreshResponse>(
          "/auth/refresh-token",
          { refresh_token: refreshToken }
        );

        const newToken = refreshResponse.data.token;
        applyNewToken(api, newToken);

        if (originalRequest.headers) {
          originalRequest.headers.authorization = `Bearer ${newToken}`;
        }

        return api(originalRequest);
      } catch (err) {
        logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
