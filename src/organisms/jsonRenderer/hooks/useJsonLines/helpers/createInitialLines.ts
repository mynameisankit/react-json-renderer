// Lodash
import _noop from "lodash/noop";
import _toPairs from "lodash/toPairs";
import _flow from "lodash/flow";
import _castArray from "lodash/castArray";
import _reduce from "lodash/reduce";

// Constants
import { EMPTY_ARRAY } from "@/constants/general";
import DATA_TYPE from "@/constants/dataType";

// Builders
import Line from "@/builders/Line";

// Helpers
import { getClosingSeparator, getOpeningSeparator } from "./dataType";
import createChildrenLines from "./createChildrenLines";

// Types
import type AdaptedJSON from "@/types/adaptedJson";

const createInitialNonPrimitiveLine = (adaptedJson: AdaptedJSON): Line => {
  const { dataType, value: original } = adaptedJson;
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

const createInitialClosingSeparatorLine = (adaptedJson: AdaptedJSON, dataType: DATA_TYPE): Line => {
  const closingSeparator = getClosingSeparator(dataType);
  const { size: lineNumber } = adaptedJson;

  const closingSeparatorLine = new Line(DATA_TYPE.CLOSING_SEPARATOR)
    .setValue(closingSeparator)
    .setDepth(1)
    .setIsLast(true)
    .setIsRoot()
    .setLineNumber(lineNumber);
  return closingSeparatorLine;
};

function createInitialNonPrimitiveLines(adaptedJson: AdaptedJSON): readonly Line[] {
  const nonPrimitiveLine = createInitialNonPrimitiveLine(adaptedJson);
  const closingSeparatorLine = createInitialClosingSeparatorLine(adaptedJson, DATA_TYPE.OBJECT);

  const childrenLines = createChildrenLines(nonPrimitiveLine);

  const initialLines = [
    nonPrimitiveLine,
    ...childrenLines,
    closingSeparatorLine,
  ];
  return initialLines;
}

function createInitialPrimitiveLines(adaptedJson: AdaptedJSON): readonly Line[] {
  const { dataType, size: lineNumber, value } = adaptedJson;

  const primitiveLine = new Line(dataType)
    .setValue(value)
    .setDepth(1)
    .setIsLast(true)
    .setIsRoot()
    .setLineNumber(lineNumber);

  const initialLines = [
    primitiveLine
  ];
  return initialLines;
}

const CREATE_INITIAL_LINE_BY_DATA_TYPE = {
  [DATA_TYPE.ARRAY]: createInitialNonPrimitiveLines,
  [DATA_TYPE.BOOLEAN]: createInitialPrimitiveLines,
  [DATA_TYPE.NULL]: createInitialPrimitiveLines,
  [DATA_TYPE.OBJECT]: createInitialNonPrimitiveLines,
  [DATA_TYPE.NUMBER]: createInitialPrimitiveLines,
  [DATA_TYPE.STRING]: createInitialPrimitiveLines
};

const createInitialLines = (adaptedJson: AdaptedJSON): readonly Line[] => {
  if (adaptedJson.value === undefined)
    return EMPTY_ARRAY;

  const dataType = adaptedJson.dataType as Exclude<DATA_TYPE, DATA_TYPE.CLOSING_SEPARATOR | DATA_TYPE.UNDEFINED>;

  const createIntialLinesOfDataType = CREATE_INITIAL_LINE_BY_DATA_TYPE[dataType];

  const initialLines = createIntialLinesOfDataType(adaptedJson);
  return initialLines;
};

export default createInitialLines;
