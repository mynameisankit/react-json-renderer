// Builders
import Line from "@/builders/Line";

// Constants
import DATA_TYPE from "@/constants/dataType";

export const shouldShowComma = (line: Line) => {
  const last = line.isLast();
  const dataType = line.getDataType();

  const renderComma = !last && dataType === DATA_TYPE.CLOSING_SEPARATOR;
  return renderComma;
};
