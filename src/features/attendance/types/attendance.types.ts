import type { UserData } from "@/features/user/types/user.types";
import type {
  DateFilterQueryParams,
  PaginationData,
  PaginationQueryParams,
} from "@/types/request.types";

export type AttendanceData = {
  date: string;
  clockIn: string;
  clockOut: string;
};

export type AttendanceHistoryPayload = {
  userId?: string;
  from?: string;
  to?: string;
};

export type AttendanceHistoryData = {
  user: UserData;
  attendance: AttendanceData[];
};

export type AllAttendanceHistoryPayload = {
  userId?: string;
} & DateFilterQueryParams &
  PaginationQueryParams;

export type AllAttendanceHistoryData = PaginationData<
  { user: UserData } & AttendanceData
>;
