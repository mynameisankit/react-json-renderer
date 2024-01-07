import { ReactNode } from "react";

// Lodash
import _times from "lodash/times";

// Builders
import Line from "@/builders/Line";

// Constants
import DATA_TYPE from "@/constants/dataType";

const EXPANDABLE_DATA_TYPES = [DATA_TYPE.ARRAY, DATA_TYPE.OBJECT];

const renderIndentLine = (index: number, rowHeight: number): ReactNode => <div key={index} style={{ width: '1px', backgroundColor: 'black', height: rowHeight }} />;

export const renderIndentLines = (line: Line, rowHeight: number) => {
  const depth = line.getDepth();

  const renderedIndentLines = _times(depth, index => renderIndentLine(index, rowHeight));
  return renderedIndentLines;
};

export const shouldShowToggleButton = (line: Line) => {
  const dataType = line.getDataType();

  const showToggleButton = EXPANDABLE_DATA_TYPES.includes(dataType);
  return showToggleButton;
};
