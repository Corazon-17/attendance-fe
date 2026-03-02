import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { SelectNative } from "../ui/select-native";
import { generatePaginationPages } from "./helpers/pagination";
import type { DataTablePaginationProps } from "./types";

export const DataTablePagination = (props: DataTablePaginationProps) => {
  const displayPages = generatePaginationPages(props.page, props.totalPages);

  const start = (props.page - 1) * props.pageSize + 1;
  const end = props.page * props.pageSize;

  const showingStart = props.totalPages < 1 ? 0 : start;
  const showingEnd = end > props.totalItems ? props.totalItems : end;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
      <div
        className={cn(
          "flex items-center gap-1",
          "[&>button]:min-w-8 [&>button]:max-h-8 [&>button]:px-2 [&>button:has(svg)]:w-8",
        )}
      >
        <Button
          variant="outline"
          onClick={() =>
            props.onPaginationChange!({ page: Number(props.prevPage) })
          }
          disabled={!props.hasPrevPage}
        >
          <ChevronLeft />
        </Button>
        {displayPages.map((p, idx) => {
          if (!p) {
            return <Ellipsis key={idx} className="w-4 mx-1 translate-y-2" />;
          }

          return (
            <Button
              key={idx}
              variant={props.page === p ? "default" : "outline"}
              onClick={() => props.onPaginationChange!({ page: p })}
            >
              {p}
            </Button>
          );
        })}
        <Button
          variant="outline"
          onClick={() =>
            props.onPaginationChange!({ page: Number(props.nextPage) })
          }
          disabled={!props.hasNextPage}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <p className="whitespace-nowrap">
          Showing {showingStart} - {showingEnd} of {props.totalItems}
        </p>
        <SelectNative
          className="w-28 h-8 rounded-md"
          value={props.pageSize}
          onChange={(e) =>
            props.onPaginationChange!({
              page: 1,
              pageSize: Number(e.target.value),
            })
          }
        >
          {[10, 20, 30, 50, 100].map((val) => (
            <option key={val} value={val}>
              {val} / page
            </option>
          ))}
        </SelectNative>
      </div>
    </div>
  );
};
