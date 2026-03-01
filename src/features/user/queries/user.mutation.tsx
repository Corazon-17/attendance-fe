import type { Response } from "@/types/request.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { changePassword, updateUser } from "../api/user.api";
import type {
  changePasswordPayload,
  UpdateUserPayload,
} from "../types/user.types";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: { id: string } & UpdateUserPayload) =>
      updateUser(data.id, data),
    onSuccess: () => {
      toast.success("User data updated successfully", {
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
