import { ERROR_MESSAGE } from "../constants/errorMessage/ko";
import { generateToken } from "./auth";

const USER_ID = import.meta.env.VITE_API_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_API_USER_PASSWORD;

interface Props {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  headers?: RequestInit["headers"];
  body?: RequestInit["body"];
  errorMessage: string;
}

class CustomFetchError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const fetchWithToken = async ({ url, headers, method = "GET", body, errorMessage }: Props) => {
  const token = generateToken(USER_ID, USER_PASSWORD);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: token,
        ...headers,
      },
      body,
    });

    if (response.status === 401 || response.status === 403) {
      throw new CustomFetchError(ERROR_MESSAGE.unauthorized);
    }

    if (response.status >= 500) {
      throw new CustomFetchError(ERROR_MESSAGE.internalServerError);
    }

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    if (method !== "GET") {
      return response;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof CustomFetchError) {
      throw new Error(error.message);
    }
    throw new Error(errorMessage);
  }
};
