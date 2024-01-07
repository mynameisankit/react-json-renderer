// Lodash
import _isNull from 'lodash/isNull';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _reduce from 'lodash/reduce';
import _noop from 'lodash/noop';
import _toString from 'lodash/toString';

// Constants
import DATA_TYPE, { ComplexDataType, PrimitiveDataType } from '@/constants/dataType';

// Helpers
import { getDataType } from './dataType';

// Types
import type { default as AdaptedJSON, PrimtiveJSON, ComplexJSON } from '@/types/adaptedJson';

type PrimitiveValue = string | number | boolean | null;
type ComplexValue = unknown[] | object;
type FieldName = string | undefined;

const adaptPrimitiveField = (fieldName: string | undefined, fieldValue: PrimitiveValue): AdaptedJSON => {
  const dataType = getDataType(fieldValue) as PrimitiveDataType;

  const adaptedPrimitive: PrimtiveJSON = {
    name: fieldName,
    size: 1,
    value: fieldValue,
    dataType,
  };
  return adaptedPrimitive;
};

const adaptObjectField = (fieldName: string, fieldValue: object): AdaptedJSON => {
  const { size, value } = adaptFields(fieldValue);

  const adaptedObject: ComplexJSON = {
    name: fieldName,
    size: size + 2,
    value,
    dataType: DATA_TYPE.OBJECT,
  };
  return adaptedObject;
};

const adaptArrayField = (fieldName: string, fieldValue: unknown[]): AdaptedJSON => {
  const { size, value } = adaptFields(fieldValue);

  const adaptedArray: ComplexJSON = {
    name: fieldName,
    size: size + 2,
    value,
    dataType: DATA_TYPE.ARRAY,
  };
  return adaptedArray;
};

const FIELD_ADAPTER_BY_JS_TYPE: { [dataType in DATA_TYPE]?: Function } = {
  [DATA_TYPE.NUMBER]: adaptPrimitiveField,
  [DATA_TYPE.STRING]: adaptPrimitiveField,
  [DATA_TYPE.BOOLEAN]: adaptPrimitiveField,
  [DATA_TYPE.NULL]: adaptPrimitiveField,
  [DATA_TYPE.OBJECT]: adaptObjectField,
  [DATA_TYPE.ARRAY]: adaptArrayField,
};

const adaptField = (fieldName: FieldName, fieldValue: unknown): AdaptedJSON | undefined => {
  const dataType = getDataType(fieldValue);

  const adapter = FIELD_ADAPTER_BY_JS_TYPE[dataType] || _noop;

  const adaptedField = adapter(fieldName, fieldValue);
  return adaptedField;
};

const getFieldNameForAdaptedField = (propertyName: string | number, dataType: DATA_TYPE): FieldName => {
  const isArray = dataType === DATA_TYPE.ARRAY;
  const fieldName = isArray ? undefined : _toString(propertyName);
  return fieldName;
};

const accumulateAdaptedFields = (accumulator: { size: number, value: AdaptedJSON[] }, fieldValue: unknown, fieldName: string, dataType: DATA_TYPE) => {
  const fieldNameForAdaptedField = getFieldNameForAdaptedField(fieldName, dataType);
  const adaptedField = adaptField(fieldNameForAdaptedField, fieldValue);

  if (!adaptedField)
    return accumulator;

  accumulator.value.push(adaptedField);
  accumulator.size += adaptedField.size;
  return accumulator;
};

const adaptFields = (elements: ComplexValue) => {
  const dataType = getDataType(elements);
  const { size, value } = _reduce(
    elements,
    (accumulator: { size: number, value: AdaptedJSON[] }, fieldValue, fieldName) => accumulateAdaptedFields(accumulator, fieldValue, fieldName, dataType),
    { size: 0, value: [] }
  );
  return { size, value };
};

const PRIMTIVE_DATA_TYPES = [
  DATA_TYPE.BOOLEAN, 
  DATA_TYPE.NULL, 
  DATA_TYPE.STRING, 
  DATA_TYPE.NUMBER,
  DATA_TYPE.UNDEFINED
];

const adaptJson = (json: unknown): AdaptedJSON => {
  const dataType = getDataType(json);

  if(PRIMTIVE_DATA_TYPES.includes(dataType)) {
    const adaptedJson = adaptPrimitiveField(undefined, json as PrimitiveValue) as PrimtiveJSON; 
    return adaptedJson;
  }

  const { size, value } = adaptFields(json as ComplexValue);

  const adaptedJson: ComplexJSON = {
    value,
    size: size + 2,
    dataType: dataType as ComplexDataType,
  };
  return adaptedJson;
};

export default adaptJson;
