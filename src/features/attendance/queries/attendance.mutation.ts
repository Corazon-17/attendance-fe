import type { Response } from "@/types/request.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { clockIn, clockOut } from "../api/attendance.api";

export const useClockIn = () => {
  return useMutation({
    mutationFn: () => clockIn(),
    onSuccess: () => {
      toast.success("Clocked in succesfully", {
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

export const useClockOut = () => {
  return useMutation({
    mutationFn: () => clockOut(),
    onSuccess: () => {
      toast.success("Clocked out succesfully", {
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
