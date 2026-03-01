import { axiosApi } from "@/lib/axios";
import type {
  AuthResponse,
  LoggedUserInfo,
  LoginPayload,
} from "../types/auth.types";

export const loginWithEmailAndPassword = (
  data: LoginPayload,
): Promise<AuthResponse> => {
  return axiosApi.post("/auth/login", data);
};

export const loggedUserInfo = (): Promise<LoggedUserInfo> => {
  return axiosApi.get("/auth/me");
};
