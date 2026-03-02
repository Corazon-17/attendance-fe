import type { Dispatch, SetStateAction } from "react";

export type ValueState<T> = [value: T, setValue: Dispatch<SetStateAction<T>>];

export interface LabelValueItem {
  label: string;
  value: string;
}

export type Menu = {
  id: string;
  name: string;
  path: string | null;
  submenu: Menu[] | null;
};
