// Lodash
import _isArray from "lodash/isArray";
import _isObject from "lodash/isObject";
import _isNull from "lodash/isNull";
import _isUndefined from "lodash/isUndefined";

// Constants
import DATA_TYPE from '@/constants/dataType';

// Types
import type { OpeningSeparator, ClosingSeparator } from "@/types/separator";

const JS_DATA_TYPE_BY_DATA_TYPE: Record<"string" | "number" | "boolean", DATA_TYPE> = {
  boolean: DATA_TYPE.BOOLEAN,
  number: DATA_TYPE.NUMBER,
  string: DATA_TYPE.STRING,
};

export const getDataType = (value: unknown): DATA_TYPE => {
  if(_isUndefined(value)) return DATA_TYPE.UNDEFINED;
  if(_isNull(value)) return DATA_TYPE.NULL;
  if(_isArray(value)) return DATA_TYPE.ARRAY;
  if(_isObject(value)) return DATA_TYPE.OBJECT;

  const jsDataType = typeof value as "string" | "number" | "boolean";

  const dataType = JS_DATA_TYPE_BY_DATA_TYPE[jsDataType];
  return dataType;
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
