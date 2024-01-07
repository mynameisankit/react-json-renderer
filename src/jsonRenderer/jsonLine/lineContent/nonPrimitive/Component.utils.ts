// Builders
import Line from "@/builders/Line";

// Types
import type { OpeningSeparator } from "@/types/separator";

export const getValueFromNonPrimitiveRow = (line: Line) => {
  const value = line.getValue() as OpeningSeparator;
  const expanded = line.isExpanded();

  if (expanded) return value;

  return `${value} ...`;
};
