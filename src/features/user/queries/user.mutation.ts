import type { Response } from "@/types/request.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import {
  changePassword,
  createUser,
  updateUser,
  updateUserForAdmin,
} from "../api/user.api";
import type {
  changePasswordPayload,
  CreateUserPayload,
  UpdateUserForAdmin,
  UpdateUserPayload,
} from "../types/user.types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      toast.success("New user created successfully", {
        position: "top-center",
      });
    },
    onError: (err: AxiosError<Response<null>>) => {
      toast.error(err.response?.data.message, {
        position: "top-center",
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string } & UpdateUserPayload) =>
      updateUser(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success("User data updated successfully", {
        position: "top-center",
      });
    },
    onError: (err: AxiosError<Response<null>>) => {
      toast.error(err.response?.data.message, {
        position: "top-center",
      });
    },
  });
};

export const useUpdateUserForAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string } & UpdateUserForAdmin) =>
      updateUserForAdmin(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      toast.success("User data updated successfully", {
        position: "top-center",
      });
    },
    onError: (err: AxiosError<Response<null>>) => {
      toast.error(err.response?.data.message, {
        position: "top-center",
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { id: string } & changePasswordPayload) =>
      changePassword(data.id, data),
    onError: (err: AxiosError<Response<null>>) => {
      toast.error(err.response?.data.message, {
        position: "top-center",
      });
    },
    onSuccess: () => {
      toast.success("Password changed successfully", {
        position: "top-center",
      });
    },
  });
};
