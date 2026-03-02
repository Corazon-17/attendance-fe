import { axiosApi } from "@/lib/axios";
import type {
  changePasswordPayload,
  CreateUserPayload,
  UpdateUserForAdmin,
  UpdateUserPayload,
  UserData,
  UserPositionData,
} from "../types/user.types";

export const getAllUsers = (): Promise<UserData[]> => {
  return axiosApi.get("users");
};

export const getAllUserPositions = (): Promise<UserPositionData[]> => {
  return axiosApi.get("users/positions");
};

export const createUser = (payload: CreateUserPayload): Promise<Response> => {
  return axiosApi.post("users", {
    ...payload,
    phone: payload.phone || undefined,
    photo: payload.photo || undefined,
  });
};

export const updateUser = (
  id: string,
  payload: UpdateUserPayload,
): Promise<Response> => {
  return axiosApi.patch("users/" + id, payload);
};

export const updateUserForAdmin = (
  id: string,
  payload: UpdateUserPayload | UpdateUserForAdmin,
): Promise<Response> => {
  return axiosApi.patch("admin/users/" + id, payload);
};

export const changePassword = (
  id: string,
  payload: changePasswordPayload,
): Promise<Response> => {
  return axiosApi.patch("users/change-password/" + id, payload);
};
