import type { Dispatch, SetStateAction } from "react";

export type ValueState<T> = [value: T, setValue: Dispatch<SetStateAction<T>>];

export interface LabelValueItem {
  label: string;
  value: string;
}
