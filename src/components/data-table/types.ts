import type { ValueState } from "@/types";
import type { PaginationMeta } from "@/types/request.types";
import type { ColumnDef } from "@tanstack/react-table";

export interface PaginationChangeData {
  page?: number;
  pageSize?: number;
}

export type OnPaginationChange = ({
  page,
  pageSize,
}: PaginationChangeData) => void;

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  meta?: PaginationMeta;
  isFetching?: boolean;
  selectUniqueKey?: keyof TData;
  selectState?: ValueState<TData[]>;
  disableSelect?: TData[];
  onPaginationChange?: OnPaginationChange;
  fetchNextPage?: () => void;
}

export interface DataTablePaginationProps extends PaginationMeta {
  onPaginationChange?: OnPaginationChange;
}
