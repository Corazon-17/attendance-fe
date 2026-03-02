import { DataTable } from "@/components/data-table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useAttendanceHistory } from "@/features/attendance/queries/attendance.query";
import type {
  AttendanceData,
  AttendanceHistoryPayload,
} from "@/features/attendance/types/attendance.types";
import { useUser } from "@/features/auth/queries/auth.query";
import { formatIndonesianDate, toDateOnlyString } from "@/lib/date";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export default function AttendanceHistory() {
  const now = new Date();
  const [filterDate, setFilterDate] = useState<DateRange | undefined>({
    from: new Date(now.getFullYear(), now.getMonth(), 1),
    to: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  });

  const { data: userData } = useUser();

  const attendanceHistoryPayload: AttendanceHistoryPayload = {
    userId: userData?.id,
    from: toDateOnlyString(filterDate?.from),
    to: toDateOnlyString(filterDate?.to),
  };
  const { data: attendanceHistory, isLoading } = useAttendanceHistory(
    attendanceHistoryPayload,
    {
      enabled: !!userData,
    },
  );

  const columns: ColumnDef<AttendanceData>[] = [
    {
      accessorKey: "date",
      header: "Tanggal",
      cell: (cell) => formatIndonesianDate(cell.row.original.date, "date-only"),
    },
    {
      accessorKey: "clockIn",
      header: "Absen Masuk",
      cell: (cell) =>
        formatIndonesianDate(cell.row.original.clockIn, "time-only"),
    },
    {
      accessorKey: "clockOut",
      header: "Absen Pulang",
      cell: (cell) =>
        formatIndonesianDate(cell.row.original.clockOut, "time-only"),
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full md:w-80">
        <DateRangePicker
          placeholder="Filter Periode"
          defaultValue={filterDate}
          onApply={(value) => setFilterDate(value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={attendanceHistory?.attendance}
        isFetching={isLoading}
      />
    </div>
  );
}
