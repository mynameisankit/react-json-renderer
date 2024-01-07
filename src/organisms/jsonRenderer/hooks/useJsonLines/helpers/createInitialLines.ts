// Lodash
import _noop from "lodash/noop";
import _toPairs from "lodash/toPairs";
import _flow from "lodash/flow";
import _castArray from "lodash/castArray";
import _reduce from "lodash/reduce";

// Constants
import DATA_TYPE from "@/constants/dataType";

// Builders
import Line from "@/builders/Line";

// Helpers
import {
  getClosingSeparator,
  getOpeningSeparator,
} from "./dataType";
import createChildrenLines from "./createChildrenLines";

// Types
import type AdaptedProperty from "@/types/adaptedProperty";

const createInitialNonPrimitiveLine = (json: AdaptedProperty): Line => {
  const { dataType, value: original } = json;
  const openingSeparator = getOpeningSeparator(dataType);

  const line = new Line(dataType)
    .setValue(openingSeparator)
    .setOriginal(original)
    .setDepth(1)
    .setIsLast(true)
    .setIsRoot()
    .setExpanded(true)
    .setLineNumber(1);
  return line;
};

const createInitialClosingSeparatorLine = (json: AdaptedProperty, dataType: DATA_TYPE): Line => {
  const closingSeparator = getClosingSeparator(dataType);
  const lineNumber = json.size;

  const closingSeparatorLine = new Line(DATA_TYPE.CLOSING_SEPARATOR)
    .setValue(closingSeparator)
    .setDepth(1)
    .setIsLast(true)
    .setIsRoot()
    .setLineNumber(lineNumber);
  return closingSeparatorLine;
};

const createInitialLines = (json: AdaptedProperty): Line[] => {
  const nonPrimitiveLine = createInitialNonPrimitiveLine(json);
  const closingSeparatorLine = createInitialClosingSeparatorLine(json, DATA_TYPE.OBJECT);

  const childrenLines = createChildrenLines(nonPrimitiveLine);

  const initialLines = [
    nonPrimitiveLine,
    ...childrenLines,
    closingSeparatorLine,
  ];
  return initialLines;
};

export default createInitialLines;
