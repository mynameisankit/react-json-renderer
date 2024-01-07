// Builders
import Line from "@/builders/Line";

export type ItemData = {
  lines: readonly Line[],
  rowHeight: number,
  handleToggleLineCollapse: (lineIndex: number) => void,
  shouldShowLineNumber: boolean,
  shouldRemoveQuotesFromKeys: boolean
};
