import {refreshTokens} from "./authService";
import { API_URL } from "../../const/apiUrl";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const doFetch = (token: string | null) =>
    fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

  let response = await doFetch(accessToken);

  if(response.status === 401){
    const newTokens = await refreshTokens();
    response = await doFetch(newTokens.accessToken);
  }

  return response
}

