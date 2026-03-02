import { axiosApi } from "@/lib/axios";
import type {
  changePasswordPayload,
  UpdateUserPayload,
  UserData,
} from "../types/user.types";

export const allUsers = (): Promise<UserData[]> => {
  return axiosApi.get("users");
};

export const updateUser = (
  id: string,
  data: UpdateUserPayload,
): Promise<Response> => {
  return axiosApi.patch("users/" + id, data);
};

export const changePassword = (
  id: string,
  data: changePasswordPayload,
): Promise<Response> => {
  return axiosApi.patch("users/change-password/" + id, data);
};
