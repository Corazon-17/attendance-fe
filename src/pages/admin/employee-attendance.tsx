import { DataTable } from "@/components/data-table";
import { Combobox } from "@/components/ui/combobox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useAllAttendanceHistory } from "@/features/attendance/queries/attendance.query";
import type {
  AllAttendanceHistoryPayload,
  AttendanceData,
} from "@/features/attendance/types/attendance.types";
import { useUser } from "@/features/auth/queries/auth.query";
import { useUsers } from "@/features/user/queries/user.query";
import type { UserData } from "@/features/user/types/user.types";
import { useQueryParams } from "@/hooks/useQueryParams";
import { formatIndonesianDate, toDateOnlyString } from "@/lib/date";
import type { SelectOption } from "@/types/input";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";

export default function EmployeeAttendance() {
  const prevFilterDateRef = useRef<string>("");

  const now = new Date();
  const [filterDate, setFilterDate] = useState<DateRange | undefined>({
    from: new Date(now.getFullYear(), now.getMonth(), 1),
    to: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  });

  const { data: allUserData } = useUsers();
  const userOptions: SelectOption[] = allUserData
    ? allUserData?.map((data: UserData) => ({
        label: data.name,
        value: data.id,
      }))
    : [];

  const { data: userData } = useUser();
  const { params, updateParams } = useQueryParams<AllAttendanceHistoryPayload>({
    page: 1,
    pageSize: 10,
    from: toDateOnlyString(filterDate?.from),
    to: toDateOnlyString(filterDate?.to),
    userId: undefined,
  });
  const { data: attendanceHistory, isLoading } = useAllAttendanceHistory(
    params,
    {
      enabled: !!userData,
    },
  );

  const columns: ColumnDef<{ user: { name: string } } & AttendanceData>[] = [
    {
      accessorKey: "user",
      header: "Nama",
      cell: (cell) => cell.row.original.user.name,
    },
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

  useEffect(() => {
    const currentFingerprint = `${filterDate?.from?.getTime()}-${filterDate?.to?.getTime()}`;
    if (currentFingerprint === prevFilterDateRef.current) {
      return;
    }

    updateParams({
      from: toDateOnlyString(filterDate?.from),
      to: toDateOnlyString(filterDate?.to),
    });
    prevFilterDateRef.current = currentFingerprint;
  }, [filterDate, updateParams]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-64">
        <DateRangePicker
          placeholder="Periode"
          defaultValue={filterDate}
          onApply={(value) => setFilterDate(value)}
        />
        <Combobox
          placeholder="Nama Karyawan"
          options={userOptions}
          onChange={(opt) => {
            updateParams({ userId: opt?.value });
          }}
        />
      </div>
      <DataTable
        columns={columns}
        data={attendanceHistory?.data}
        meta={attendanceHistory?.meta}
        isFetching={isLoading}
        onPaginationChange={updateParams}
      />
    </div>
  );
}
