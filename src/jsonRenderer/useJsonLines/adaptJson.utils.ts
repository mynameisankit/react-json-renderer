// Constants
import DATA_TYPE, { ComplexDataType, PrimitiveDataType } from '@/constants/dataType';

// Helpers
import { getDataType } from './dataType.utils';

// Types
import type { default as AdaptedJSON, PrimtiveJSON, ComplexJSON } from '@/types/adaptedJson';

type PrimitiveValue = string | number | boolean | null;
type ComplexValue = unknown[] | object;
type FieldName = string | undefined;

const isPrimitiveValue = (value: unknown): value is PrimitiveValue =>
  value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';

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

const adaptField = (fieldName: FieldName, fieldValue: unknown): AdaptedJSON | undefined => {
  if (isPrimitiveValue(fieldValue))
    return adaptPrimitiveField(fieldName, fieldValue);

  if (Array.isArray(fieldValue))
    return adaptArrayField(fieldName || '', fieldValue);

  if (fieldValue !== null && typeof fieldValue === 'object')
    return adaptObjectField(fieldName || '', fieldValue);

  return undefined;
};

const getFieldNameForAdaptedField = (propertyName: string | number, dataType: DATA_TYPE): FieldName => {
  const isArray = dataType === DATA_TYPE.ARRAY;
  const fieldName = isArray ? undefined : String(propertyName);
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
  const dataType = Array.isArray(elements) ? DATA_TYPE.ARRAY : DATA_TYPE.OBJECT;
  const initial = { size: 0, value: [] as AdaptedJSON[] };
  return Object.entries(elements).reduce(
    (accumulator, [fieldName, fieldValue]) =>
      accumulateAdaptedFields(accumulator, fieldValue, fieldName, dataType),
    initial,
  );
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
