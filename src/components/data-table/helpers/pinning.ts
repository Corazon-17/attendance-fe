import { Column } from "@tanstack/react-table";
import { CSSProperties } from "react";

export const getPinningStyles = (
  column: Column<any>,
  isEnableSelect: boolean,
): CSSProperties => {
  const isPinned = column.getIsPinned();
  const offset = isEnableSelect ? 40 : 0;
  return {
    left:
      isPinned === "left" ? `${column.getStart("left") + offset}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
