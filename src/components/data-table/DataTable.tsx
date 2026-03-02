import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import SimpleBar from "simplebar-react";
import { Checkbox } from "../ui/checkbox";
import { Spinner } from "../ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTableColumnPinning } from "./DataTableColumnPinning";
import { DataTablePagination } from "./DataTablePagination";
import { getPinningStyles } from "./helpers/pinning";
import { useRowSelection } from "./hooks/useRowSelection";
import type { DataTableProps } from "./types";

export function DataTable<TData, TValue>({
  ...props
}: DataTableProps<TData, TValue>) {
  const uniqueKey = props.selectUniqueKey || ("id" as keyof TData);

  const emptyData = useMemo(() => [], []);
  const tableData = props.data?.length ? props.data : emptyData;

  const { selected, handleSelectRow, handleSelectAll } = useRowSelection<TData>(
    {
      data: tableData,
      selectKey: uniqueKey,
      selectState: props.selectState,
      disableSelect: props.disableSelect,
    },
  );
  const columnCount = props.columns.length + (selected ? 1 : 0);

  const loaderRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: props.fetchNextPage,
    enabled: props.meta?.hasNextPage && !props.isFetching,
  });

  const table = useReactTable({
    data: tableData,
    columns: props.columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        left: ["select"],
        right: ["action"],
      },
    },
    defaultColumn: {
      cell: ({ getValue }) => {
        const value = getValue();
        return !value ? "-" : String(value);
      },
    },
  });

  if (props.onPaginationChange && props.fetchNextPage) {
    console.error(
      "DataTable configuration error: pagination and infinite scroll cannot be enabled at the same time. Please enable only one.",
    );
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "grid gap-4 w-full rounded-md overflow-hidden",
          "shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:shadow-white/10",
        )}
      >
        <SimpleBar className="grid max-h-[calc(100vh-220px)]">
          <Table className="table-fixed overflow-auto border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
            <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-xs">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {/* Select Column Header */}
                  {selected && (
                    <TableHead
                      className={cn(
                        "sticky left-0 w-10 z-1 text-center h-10 border-r",
                        "data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l [&[data-pinned][data-last-col]]:border-border",
                      )}
                      data-pinned="left"
                    >
                      <Checkbox
                        checked={
                          props.data &&
                          props.data?.length > 0 &&
                          props.data?.length ===
                            selected?.length +
                              (props.disableSelect?.length || 0)
                        }
                        onClick={handleSelectAll}
                        className="translate-y-0.5"
                        role="select"
                      />
                    </TableHead>
                  )}
                  {/* Select Column Header */}

                  {headerGroup.headers.map((header) => {
                    const { column } = header;
                    const isPinned = column.getIsPinned();
                    const isLastLeftPinned =
                      isPinned === "left" && column.getIsLastColumn("left");
                    const isFirstRightPinned =
                      isPinned === "right" && column.getIsFirstColumn("right");

                    return (
                      <TableHead
                        key={header.id}
                        className="relative h-10 truncate data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l [&[data-pinned][data-last-col]]:border-border"
                        colSpan={header.colSpan}
                        style={{ ...getPinningStyles(column, !!selected) }}
                        data-pinned={isPinned || undefined}
                        data-last-col={
                          isLastLeftPinned
                            ? "left"
                            : isFirstRightPinned
                              ? "right"
                              : undefined
                        }
                      >
                        <div
                          className="flex items-center justify-between gap-2"
                          style={{
                            placeContent: header.column.columnDef.meta?.align,
                          }}
                        >
                          <span className="truncate">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </span>

                          <DataTableColumnPinning header={header} />

                          {header.column.getCanResize() && (
                            <div
                              {...{
                                onDoubleClick: () => header.column.resetSize(),
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className:
                                  "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px",
                              }}
                            />
                          )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {/* Selected Column Body */}
                      {selected && (
                        <TableCell
                          className={cn(
                            "sticky left-0 w-10 z-1 text-center border-r",
                            "data-pinned:bg-background/90 data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l [&[data-pinned][data-last-col]]:border-border",
                          )}
                          data-pinned="left"
                        >
                          <Checkbox
                            checked={selected.some(
                              (val: any) =>
                                val[uniqueKey] === row.original[uniqueKey],
                            )}
                            onClick={() => handleSelectRow(row)}
                            disabled={props.disableSelect?.some(
                              (val) =>
                                val[uniqueKey] === row.original[uniqueKey],
                            )}
                            role="select"
                          />
                        </TableCell>
                      )}
                      {/* Selected Column Body */}

                      {row.getVisibleCells().map((cell) => {
                        const { column } = cell;
                        const isPinned = column.getIsPinned();
                        const isLastLeftPinned =
                          isPinned === "left" && column.getIsLastColumn("left");
                        const isFirstRightPinned =
                          isPinned === "right" &&
                          column.getIsFirstColumn("right");

                        return (
                          <TableCell
                            key={cell.id}
                            className="truncate whitespace-break-spaces data-pinned:bg-background/90 data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l [&[data-pinned][data-last-col]]:border-border"
                            style={{
                              textAlign: cell.column.columnDef.meta?.align,
                              ...getPinningStyles(column, !!selected),
                            }}
                            data-pinned={isPinned || undefined}
                            data-last-col={
                              isLastLeftPinned
                                ? "left"
                                : isFirstRightPinned
                                  ? "right"
                                  : undefined
                            }
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                : !props.isFetching && (
                    <TableRow>
                      <TableCell
                        colSpan={columnCount}
                        className="h-24 text-center"
                      >
                        No data found.
                      </TableCell>
                    </TableRow>
                  )}

              {/* Fetch next page trigger for infinite scroll */}
              {props.fetchNextPage &&
                props.meta?.hasNextPage &&
                !props.isFetching && (
                  <TableRow>
                    <TableCell colSpan={columnCount}>
                      <div
                        ref={loaderRef}
                        className="h-20 text-center"
                        onClick={() =>
                          props.fetchNextPage && props.fetchNextPage()
                        }
                      >
                        Load More
                      </div>
                    </TableCell>
                  </TableRow>
                )}

              {props.isFetching && (
                <TableRow>
                  <TableCell colSpan={columnCount}>
                    <div className="flex justify-center items-center gap-2 py-2">
                      <Spinner className="size-4" /> <span>Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </SimpleBar>
      </div>

      {props.meta && (
        <DataTablePagination
          onPaginationChange={props.onPaginationChange}
          {...props.meta}
        />
      )}
    </div>
  );
}
