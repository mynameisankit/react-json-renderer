// Builders
import Line from "@/builders/Line";

// TODO: Find other way?
export type ItemData = {
  lines: Line[],
  rowHeight: number,
  handleToggleLineCollapse: (lineIndex: number) => void,
  shouldShowLineNumber: boolean,
};
