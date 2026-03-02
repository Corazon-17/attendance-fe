import type { Header } from "@tanstack/react-table";
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  EllipsisIcon,
  PinOffIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const DataTableColumnPinning = ({
  header,
}: {
  header: Header<any, any>;
}) => {
  if (header.isPlaceholder || !header.column.getCanPin()) return undefined;

  if (header.column.getIsPinned()) {
    return (
      <Button
        size="icon"
        variant="ghost"
        className="-mr-1 size-7 shadow-none"
        onClick={() => header.column.pin(false)}
        aria-label={`Unpin ${header.column.columnDef.header as string} column`}
        title={`Unpin ${header.column.columnDef.header as string} column`}
      >
        <PinOffIcon className="opacity-60" size={16} aria-hidden="true" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="-mr-1 size-7 shadow-none"
          // aria-label={`Pin options for ${header.column.columnDef.header as string} column`}
          // title={`Pin options for ${header.column.columnDef.header as string} column`}
        >
          <EllipsisIcon className="opacity-60" size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => header.column.pin("left")}>
          <ArrowLeftToLineIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
          Stick to left
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => header.column.pin("right")}>
          <ArrowRightToLineIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
          Stick to right
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
