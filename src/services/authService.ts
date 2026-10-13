import axios from "axios";

const AUTH_URL = "https://dummyjson.com/auth";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
};

export async function loginUser(credentials: LoginCredentials) {
  const response = await axios.post<AuthUser>(`${AUTH_URL}/login`, credentials);

  return response.data;
}
