// Constants
import DATA_TYPE from '@/constants/dataType';

// Types
import type { OpeningSeparator, ClosingSeparator } from "@/types/separator";

const JS_DATA_TYPE_BY_DATA_TYPE: Record<"string" | "number" | "boolean", DATA_TYPE> = {
  boolean: DATA_TYPE.BOOLEAN,
  number: DATA_TYPE.NUMBER,
  string: DATA_TYPE.STRING,
};

const isPrimitiveJavaScriptType = (dataType: string): dataType is keyof typeof JS_DATA_TYPE_BY_DATA_TYPE =>
  dataType in JS_DATA_TYPE_BY_DATA_TYPE;

export const getDataType = (value: unknown): DATA_TYPE => {
  if (value === undefined) return DATA_TYPE.UNDEFINED;
  if (value === null) return DATA_TYPE.NULL;
  if (Array.isArray(value)) return DATA_TYPE.ARRAY;
  if (typeof value === 'object') return DATA_TYPE.OBJECT;

  const jsDataType = typeof value;
  return isPrimitiveJavaScriptType(jsDataType)
    ? JS_DATA_TYPE_BY_DATA_TYPE[jsDataType]
    : DATA_TYPE.UNDEFINED;
};

const CLOSING_SEPARATOR_BY_DATA_TYPE: { [key in DATA_TYPE]?: ClosingSeparator } = {
  [DATA_TYPE.OBJECT]: "}",
  [DATA_TYPE.ARRAY]: "]",
};

export const getClosingSeparator = (dataType: DATA_TYPE) => {
  const closingSeparator = CLOSING_SEPARATOR_BY_DATA_TYPE[dataType as DATA_TYPE.OBJECT | DATA_TYPE.ARRAY];
  return closingSeparator;
};

const OPENING_SEPARATOR_BY_DATA_TYPE: { [key in DATA_TYPE]?: OpeningSeparator } = {
  [DATA_TYPE.OBJECT]: "{",
  [DATA_TYPE.ARRAY]: "[",
};

export const getOpeningSeparator = (dataType: DATA_TYPE) => {
  const openingSeparator = OPENING_SEPARATOR_BY_DATA_TYPE[dataType as DATA_TYPE.OBJECT | DATA_TYPE.ARRAY];
  return openingSeparator;
};
