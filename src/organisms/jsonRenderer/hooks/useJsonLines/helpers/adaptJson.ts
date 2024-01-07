// Lodash
import _isNull from 'lodash/isNull';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _reduce from 'lodash/reduce';
import _noop from 'lodash/noop';

// Constants
import DATA_TYPE, { ComplexDataType, PrimitiveDataType } from '@/constants/dataType';

// Helpers
import { getDataType } from './dataType';

// Types
import type AdaptedProperty from '@/types/adaptedProperty';

const adaptPrimitive = (propertyValue: string | number | boolean | null, propertyName: string): AdaptedProperty => {
  const dataType = getDataType(propertyValue) as PrimitiveDataType;
  
  const adaptedPrimitive = {
    name: propertyName,
    size: 1,
    value: propertyValue,
    dataType,
  };
  return adaptedPrimitive;
};

const adaptObject = (propertyValue: object, propertyName: string): AdaptedProperty => {
  const { size, value } = adaptElements(propertyValue);

  // TODO: How to avoid Type Assertion here?
  const adaptedObject = {
    name: propertyName,
    size: size + 2,
    value,
    dataType: DATA_TYPE.OBJECT as DATA_TYPE.OBJECT,
  };
  return adaptedObject;
};

const adaptArray = (propertyValue: unknown[], propertyName: string): AdaptedProperty => {
  const { size, value } = adaptElements(propertyValue);
  
  const adaptedArray = {
    name: propertyName,
    size: size + 2,
    value,
    // TODO: How to avoid Type Assertion here?
    dataType: DATA_TYPE.ARRAY as DATA_TYPE.ARRAY,
  };
  return adaptedArray;
};

const ADAPTER_BY_JS_TYPE: { [dataType in DATA_TYPE]?: Function } = {
  [DATA_TYPE.NUMBER]: adaptPrimitive,
  [DATA_TYPE.STRING]: adaptPrimitive,
  [DATA_TYPE.BOOLEAN]: adaptPrimitive,
  [DATA_TYPE.NULL]: adaptPrimitive,
  [DATA_TYPE.OBJECT]: adaptObject,
  [DATA_TYPE.ARRAY]: adaptArray,
};

const adaptProperty = (propertyValue: unknown, propertyName: string | undefined): AdaptedProperty | undefined => {
  const dataType = getDataType(propertyValue);

  const adapter = ADAPTER_BY_JS_TYPE[dataType] || _noop;

  const adaptedProperty = adapter(propertyValue, propertyName);
  return adaptedProperty;
};

const accumulateElements = ({ size, value: accumulateElements }: { size: number, value: AdaptedProperty[] }, propertyValue: unknown, propertyName: string, dataType: DATA_TYPE) => {
  const isArray = dataType === DATA_TYPE.ARRAY;
  const adaptedElement = adaptProperty(propertyValue, !isArray ? propertyName : undefined);
  
  const updatedSize = size + (adaptedElement?.size || 0);
  
  if(adaptedElement) accumulateElements.push(adaptedElement);

  return { size: updatedSize, value: accumulateElements };
};

// TODO: Better naming?
const adaptElements = (elements: unknown[] | object | undefined): { size: number, value: AdaptedProperty[] } => {
  const dataType = getDataType(elements);
  const { size, value } = _reduce(
    elements, 
    (accumulator: { size: number, value: AdaptedProperty[] }, propertyValue, propertyName) => accumulateElements(accumulator, propertyValue, propertyName, dataType), 
    { size: 0, value: [] }
  );
  return { size, value };
};

const adaptJson = (json: unknown[] | object | undefined): AdaptedProperty => {
  const dataType = getDataType(json) as ComplexDataType;
  const { size, value } = adaptElements(json);

  const adaptedJson = {
    value,
    size: size + 2,
    dataType,
  };
  return adaptedJson;
};

export default adaptJson;
