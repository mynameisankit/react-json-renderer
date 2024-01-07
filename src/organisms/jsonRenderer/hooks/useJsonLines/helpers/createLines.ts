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
import type AdaptedJSON from "@/types/adaptedJson";
import type CreateLineParams from "../types/createLineParams";

type CreateLineParamsWithLineNumberOffset = CreateLineParams & { lineNumberOffset: number };

const isLastField = (propertyIndex: number, properties: AdaptedJSON[]): boolean => {
  const lastPropertyIndex = _size(properties);

  const lastField = propertyIndex + 1 === lastPropertyIndex;
  return lastField;
};

const getClosingSeparatorLine = ({
  dataType,
  depth,
  fieldIndex,
  fields,
}: {
  dataType: DATA_TYPE,
  depth: number,
  fieldIndex: number,
  fields: AdaptedJSON[]
}): Line => {
  const last = isLastField(fieldIndex, fields);
  const closingSeparator = getClosingSeparator(dataType);

  const closingSeparatorLine = new Line(DATA_TYPE.CLOSING_SEPARATOR)
    .setValue(closingSeparator)
    .setDepth(depth)
    .setIsLast(last);
  return closingSeparatorLine;
};

const createNonPrimitiveLine = ({
  name, 
  value,
  depth,
  dataType
}: {
  name: string | undefined,
  value: unknown,
  depth: number,
  dataType: ComplexDataType
}): Line => {
  const openingSeparator = getOpeningSeparator(dataType);

  const line = new Line(dataType)
    .setName(name)
    .setValue(openingSeparator)
    .setOriginal(value)
    .setDepth(depth);
  return line;
};

const createNonPrimitiveLines = ({
  fieldValue,
  fieldIndex,
  fields,
  depth,
  lineNumberOffset,
}: CreateLineParamsWithLineNumberOffset): Line[] => {
  const { name, dataType, value, size } = fieldValue;

  const nonPrimitiveLine = createNonPrimitiveLine({
    name,
    value,
    depth,
    dataType: dataType as ComplexDataType,
  }).setLineNumber(lineNumberOffset + 1);
  const closingSeparatorLine = getClosingSeparatorLine({
    dataType,
    depth,
    fieldIndex,
    fields,
  }).setLineNumber(lineNumberOffset + size);

  const objectLines = [nonPrimitiveLine, closingSeparatorLine];
  return objectLines;
};

const createPrimitiveLine = ({
  fieldValue,
  fieldIndex,
  fields,
  depth,
  lineNumberOffset,
}: CreateLineParamsWithLineNumberOffset): Line => {
  const { name, dataType, value } = fieldValue;
  const isLast = isLastField(fieldIndex, fields);

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

const createLines = (lineParams: CreateLineParamsWithLineNumberOffset): Line[] => {
  const { fieldValue: { dataType } } = lineParams;

  const createLinesForDataType = CREATE_LINES_BY_DATA_TYPE[dataType as Exclude<DATA_TYPE, DATA_TYPE.UNDEFINED>] || _noop;

  const lines: Line[] = _flow(createLinesForDataType, _castArray)(lineParams);
  return lines;
};

export default createLines;
