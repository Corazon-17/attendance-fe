import { Button } from "@/components/ui/button";
import {
  useClockIn,
  useClockOut,
} from "@/features/attendance/queries/attendance.mutation";
import { useCurrentDateTime } from "@/hooks/useCurrentDateTime";

export default function Attendance() {
  const date = useCurrentDateTime();
  const { mutate: mutateIn, isPending: isPendingIn } = useClockIn();
  const { mutate: mutateOut, isPending: isPendingOut } = useClockOut();

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <p className="text-[clamp(1rem,2vw,2rem)] font-bold">{date}</p>
      <div className="grid grid-cols-2 gap-2">
        <Button size="lg" onClick={() => mutateIn()} disabled={isPendingIn}>
          Absen Masuk
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => mutateOut()}
          disabled={isPendingOut}
        >
          Absen Pulang
        </Button>
      </div>
    </div>
  );
}
