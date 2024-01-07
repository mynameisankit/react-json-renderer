// Builders
import Line from "@/builders/Line";

export const renderPrimitiveValue = (line: Line) => {
  const value = line.getValue();

  const stringifiedValue = JSON.stringify(value);
  return stringifiedValue;
};
