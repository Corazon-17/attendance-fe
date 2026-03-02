import { axiosApi } from "@/lib/axios";
import type {
  AllAttendanceHistoryData,
  AllAttendanceHistoryPayload,
  AttendanceHistoryData,
  AttendanceHistoryPayload,
} from "../types/attendance.types";

export const clockIn = () => {
  return axiosApi.post("/attendance/clock-in");
};

export const clockOut = () => {
  return axiosApi.post("/attendance/clock-out");
};

export const attendaceHistory = (
  payload: AttendanceHistoryPayload,
): Promise<AttendanceHistoryData> => {
  return axiosApi.get("/attendance/" + payload.userId, {
    params: {
      from: payload.from,
      to: payload.to,
    },
  });
};

export const allAttendaceHistory = (
  payload: AllAttendanceHistoryPayload,
): Promise<AllAttendanceHistoryData> => {
  return axiosApi.get("/attendance", {
    params: {
      page: payload.page,
      pageSize: payload.pageSize,
      from: payload.from,
      to: payload.to,
      userId: payload.userId,
    },
  });
};
