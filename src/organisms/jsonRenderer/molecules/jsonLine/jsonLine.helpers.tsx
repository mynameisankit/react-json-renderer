// Builders
import Line from "@/builders/Line";

// Constants
import DATA_TYPE from "@/constants/dataType";

const EXPANDABLE_DATA_TYPES = [DATA_TYPE.ARRAY, DATA_TYPE.OBJECT];

export const shouldShowToggleButton = (line: Line) => {
  const dataType = line.getDataType();

  const showToggleButton = EXPANDABLE_DATA_TYPES.includes(dataType);
  return showToggleButton;
};
