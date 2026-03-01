import { ValueState } from "@/types";
import type { Row } from "@tanstack/react-table";
import { useCallback } from "react";

interface UseRowSelectionProps<TData> {
  data: TData[];
  selectKey: keyof TData;
  selectState?: ValueState<TData[]>;
  disableSelect?: TData[];
}

export function useRowSelection<TData>({
  data,
  selectKey,
  selectState,
  disableSelect,
}: UseRowSelectionProps<TData>) {
  const [selected, setSelected] = selectState ?? [null, null];

  const handleSelectAll = useCallback(() => {
    if (!setSelected || !selected) return;

    const disabledIds = new Set(
      disableSelect?.map((val) => val[selectKey]) ?? [],
    );

    const selectableCount = data.length - disabledIds.size;

    let nextSelected: TData[] = [];

    if (selected.length < selectableCount) {
      nextSelected = data.filter((row) => !disabledIds.has(row[selectKey]));
    }

    setSelected(nextSelected);
  }, [data, disableSelect, selectKey, selected, setSelected]);

  const handleSelectRow = useCallback(
    (row: Row<TData>) => {
      if (!setSelected || !selected) return;

      const rowId = row.original[selectKey];
      const isSelected = selected.some((val) => val[selectKey] === rowId);

      setSelected((prev) =>
        isSelected
          ? prev.filter((val) => val[selectKey] !== rowId)
          : [...prev, row.original],
      );
    },
    [selectKey, selected, setSelected],
  );

  return {
    selected,
    handleSelectAll,
    handleSelectRow,
  };
}
