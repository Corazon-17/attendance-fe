import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";

type ActionColumnOptions<TData> = {
  header?: string;
  renderActions: (ctx: CellContext<TData, unknown>) => React.ReactNode;
};

export function createActionColumn<TData>({
  header = "Aksi",
  renderActions,
}: ActionColumnOptions<TData>): ColumnDef<TData> {
  return {
    id: "action",
    header,
    cell: (ctx) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Table action" variant="ghost" size="icon">
            <EllipsisIcon size={16} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {renderActions(ctx)}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    maxSize: 60,
    enableResizing: false,
    enablePinning: false,
    meta: {
      align: "center",
    },
  };
}
