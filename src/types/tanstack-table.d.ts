import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<
    TData extends import("@tanstack/react-table").RowData,
    TValue,
  > {
    sticky?: "left" | "right";
    align?: "left" | "center" | "right";
  }
}
