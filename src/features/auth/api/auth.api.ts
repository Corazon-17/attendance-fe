import type { UserData } from "@/features/user/types/user.types";
import { axiosApi } from "@/lib/axios";
import type { AuthResponse, LoginPayload } from "../types/auth.types";

export const loginWithEmailAndPassword = (
  data: LoginPayload,
): Promise<AuthResponse> => {
  return axiosApi.post("/auth/login", data);
};

export const logout = (): Promise<null> => {
  return axiosApi.post("/auth/logout");
};

export const loggedUserData = (): Promise<UserData> => {
  return axiosApi.get("/auth/me");
};
