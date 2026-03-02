"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateForDisplay } from "@/lib/date";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";

interface DateRangePickerProps {
  id?: string;
  value?: DateRange;
  defaultValue?: DateRange;
  placeholder?: string;
  onApply?: (value: DateRange | undefined) => void;
  onChange?: (value: DateRange | undefined) => void;
  onClear?: () => void;
}

const getDateRangeLabel = (range?: DateRange) => {
  if (range?.from && range?.to) {
    return `${formatDateForDisplay(range.from, {
      format: { month: "short" },
    })} - ${formatDateForDisplay(range.to, {
      format: { month: "short" },
    })}`;
  }

  return null;
};

export function DateRangePicker({
  id,
  value,
  defaultValue,
  placeholder,
  onChange,
  onApply,
  onClear,
}: DateRangePickerProps) {
  const currentYear = new Date().getFullYear();
  const startMonth = new Date(2000, 0);
  const endMonth = new Date(currentYear + 20, 11);

  const isControlled = value !== undefined;

  const [internalRange, setInternalRange] = useState<DateRange | undefined>(
    defaultValue,
  );
  const [open, setOpen] = useState(false);

  const range = isControlled ? value : internalRange;

  const handleSelect = (selected: DateRange | undefined) => {
    if (!isControlled) {
      setInternalRange(selected);
    }
    onChange?.(selected);
  };

  const handleClear = () => {
    handleSelect(undefined);
    onClear?.();
  };

  useEffect(() => {
    if (!open) {
      onApply?.(internalRange);
    }
  }, [open, onApply, internalRange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className="w-full justify-between font-normal"
        >
          {getDateRangeLabel(range) || placeholder || "Select date..."}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          captionLayout="dropdown"
          startMonth={startMonth}
          endMonth={endMonth}
          numberOfMonths={2}
        />

        <div className="flex justify-end gap-1 border-t px-3 py-2">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button
            onClick={() => {
              onApply?.(internalRange);
              setOpen(false);
            }}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
