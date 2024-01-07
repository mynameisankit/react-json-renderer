// Constants
import DATA_TYPE, { ComplexDataType } from "@/constants/dataType";

// Builders
import Line from "@/builders/Line";

// Helpers
import {
  getClosingSeparator,
  getOpeningSeparator,
} from './dataType.utils';

// Types
import type AdaptedJSON from "@/types/adaptedJson";
import type CreateLineParams from './types/createLineParams';

type CreateLineParamsWithLineNumberOffset = CreateLineParams & { lineNumberOffset: number };

const isLastField = (propertyIndex: number, properties: AdaptedJSON[]): boolean => {
  const lastField = propertyIndex + 1 === properties.length;
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

const createLines = (lineParams: CreateLineParamsWithLineNumberOffset): Line[] => {
  const { fieldValue: { dataType } } = lineParams;

  switch (dataType) {
    case DATA_TYPE.OBJECT:
    case DATA_TYPE.ARRAY:
      return createNonPrimitiveLines(lineParams);
    case DATA_TYPE.STRING:
    case DATA_TYPE.BOOLEAN:
    case DATA_TYPE.NUMBER:
    case DATA_TYPE.NULL:
      return [createPrimitiveLine(lineParams)];
    default:
      return [];
  }
};

export default createLines;
