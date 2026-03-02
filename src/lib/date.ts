type DateMode = "date-only" | "time-only" | "full";
type DateInput = Date | string | null | undefined;

export const formatIndonesianDate = (
  isoString: string,
  mode: DateMode = "full",
): string => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Format Salah";

  const configs: Record<DateMode, Intl.DateTimeFormatOptions> = {
    "date-only": {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
    "time-only": {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    },
    full: {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
  };

  return new Intl.DateTimeFormat("id-ID", configs[mode]).format(date);
};

export const parseDateInput = (input: DateInput): Date | null => {
  if (!input) return null;

  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }

  if (typeof input === "string") {
    const normalized = input.includes("T")
      ? input
      : input.includes(" ")
        ? input.replace(" ", "T")
        : input;

    const date = new Date(normalized);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
};

export const formatDateForDisplay = (
  input: DateInput,
  options?: {
    locales?: Intl.LocalesArgument;
    format?: Intl.DateTimeFormatOptions;
  },
): string => {
  const date = parseDateInput(input);
  if (!date) return "-";

  return new Intl.DateTimeFormat(options?.locales ?? "id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options?.format,
  }).format(date);
};

export const toDateOnlyString = (date?: Date): string | undefined => {
  if (!date) return undefined;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
};
