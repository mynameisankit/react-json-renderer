// Lodash
import _noop from "lodash/noop";
import _size from "lodash/size";
import _castArray from "lodash/castArray";
import _flow from "lodash/flow";

// Constants
import DATA_TYPE, { ComplexDataType } from "@/constants/dataType";

// Builders
import Line from "@/builders/Line";

// Helpers
import {
  getClosingSeparator,
  getOpeningSeparator,
} from "./dataType";

// Types
import type AdaptedProperty from "@/types/adaptedProperty";

const isLastProperty = (propertyIndex: number, properties: AdaptedProperty[]): boolean => {
  const lastPropertyIndex = _size(properties);

  const lastProperty = propertyIndex + 1 === lastPropertyIndex;
  return lastProperty;
};

const getClosingSeparatorLine = ({
  dataType,
  depth,
  propertyIndex,
  properties,
}: {
  dataType: DATA_TYPE,
  depth: number,
  propertyIndex: number,
  properties: AdaptedProperty[]
}): Line => {
  const last = isLastProperty(propertyIndex, properties);
  const closingSeparator = getClosingSeparator(dataType);

  const closingSeparatorLine = new Line(DATA_TYPE.CLOSING_SEPARATOR)
    .setValue(closingSeparator)
    .setDepth(depth)
    .setIsLast(last);
  return closingSeparatorLine;
};

const createNonPrimitiveLine = (name: string | undefined, value: unknown, depth: number, dataType: ComplexDataType): Line => {
  const openingSeparator = getOpeningSeparator(dataType);

  const line = new Line(dataType)
    .setName(name)
    .setValue(openingSeparator)
    .setOriginal(value)
    .setDepth(depth);
  return line;
};

const createNonPrimitiveLines = ({
  propertyValue,
  propertyIndex,
  properties,
  depth,
  lineNumberOffset,
}: {
  propertyValue: AdaptedProperty,
  propertyIndex: number,
  properties: AdaptedProperty[],
  depth: number,
  lineNumberOffset: number,
}): Line[] => {
  const { name, dataType, value, size } = propertyValue;

  const nonPrimitiveLine = createNonPrimitiveLine(
    name,
    value,
    depth,
    dataType as ComplexDataType,
  ).setLineNumber(lineNumberOffset + 1);
  const closingSeparatorLine = getClosingSeparatorLine({
    dataType,
    depth,
    propertyIndex,
    properties,
  }).setLineNumber(lineNumberOffset + size);

  const objectLines = [nonPrimitiveLine, closingSeparatorLine];
  return objectLines;
};

const createPrimitiveLine = ({
  propertyValue,
  propertyIndex,
  properties,
  depth,
  lineNumberOffset,
}: {
  propertyValue: AdaptedProperty,
  propertyIndex: number,
  properties: AdaptedProperty[],
  depth: number,
  lineNumberOffset: number,
}): Line => {
  const { name, dataType, value } = propertyValue;
  const isLast = isLastProperty(propertyIndex, properties);

  const line = new Line(dataType)
    .setName(name)
    .setValue(value)
    .setDepth(depth)
    .setIsLast(isLast)
    .setLineNumber(lineNumberOffset + 1);
  return line;
};

const CREATE_LINES_BY_DATA_TYPE = {
  [DATA_TYPE.OBJECT]: createNonPrimitiveLines,
  [DATA_TYPE.ARRAY]: createNonPrimitiveLines,
  [DATA_TYPE.STRING]: createPrimitiveLine,
  [DATA_TYPE.BOOLEAN]: createPrimitiveLine,
  [DATA_TYPE.CLOSING_SEPARATOR]: createPrimitiveLine,
  [DATA_TYPE.NUMBER]: createPrimitiveLine,
  [DATA_TYPE.NULL]: createPrimitiveLine,
};

// Share arg type with createChildrenLines
const createLines = (lineParams: {
  propertyValue: AdaptedProperty,
  propertyIndex: number,
  properties: AdaptedProperty[],
  depth: number,
  lineNumberOffset: number,
}): Line[] => {
  const { propertyValue } = lineParams;
  const { dataType } = propertyValue;

  const createLinesForDataType = CREATE_LINES_BY_DATA_TYPE[dataType] || _noop;

  const lines = _flow(createLinesForDataType, _castArray)(lineParams);
  return lines;
};

export default createLines;
