import type { ListItemKeySelector } from "react-window";
import { nanoid } from "nanoid";

// Builders
import Line from "@/builders/Line";

// Types
import type { ItemData } from "./jsonRenderer.helpers.types";

export const getLineKey: ListItemKeySelector<ItemData> = (index, data) => {
  const { lines } = data;

  const line = lines[index];

  const lineKey = line.getKey();
  return lineKey;
};

export const getAutoSizerProp = ({ nonce }: { nonce: string }) => ({
  nonce: nonce ?? nanoid(),
});

// TODO: Reuse (lineIndex: number) => void
export const getItemData = ({ 
  lines, 
  rowHeight, 
  handleToggleLineCollapse, 
  shouldShowLineNumber
}: { 
  lines: Line[], 
  rowHeight: number, 
  handleToggleLineCollapse: (lineIndex: number) => void, 
  shouldShowLineNumber: boolean,
}): ItemData => ({
  lines,
  rowHeight,
  handleToggleLineCollapse,
  shouldShowLineNumber,
});
