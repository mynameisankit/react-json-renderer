// Builders
import Line from "@/builders/Line";

export const copyLine = (line: Line): Line => {
  const dataType = line.getDataType();

  const copiedLine = Object.assign(new Line(dataType), line);
  return copiedLine;
};
