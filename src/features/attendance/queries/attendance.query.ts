import type { QueryOptions } from "@/types/query";
import { useQuery } from "@tanstack/react-query";
import { allAttendaceHistory, attendaceHistory } from "../api/attendance.api";
import type {
  AllAttendanceHistoryPayload,
  AttendanceHistoryPayload,
} from "../types/attendance.types";

export const useAttendanceHistory = (
  payload: AttendanceHistoryPayload,
  options?: QueryOptions,
) => {
  return useQuery({
    queryKey: ["attendance-history", payload],
    queryFn: () => attendaceHistory(payload),
    enabled: options?.enabled,
  });
};

export const useAllAttendanceHistory = (
  payload: AllAttendanceHistoryPayload,
  options?: QueryOptions,
) => {
  return useQuery({
    queryKey: ["all-attendance-history", payload],
    queryFn: () => allAttendaceHistory(payload),
    enabled: options?.enabled,
  });
};
