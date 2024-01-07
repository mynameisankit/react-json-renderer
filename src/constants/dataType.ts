enum DATA_TYPE {
  OBJECT = "OBJECT",
  ARRAY = "ARRAY",
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  NULL = "NULL",
  CLOSING_SEPARATOR = "CLOSING_SEPARATOR",
  UNDEFINED = "UNDEFINED"
}

export type ComplexDataType = DATA_TYPE.OBJECT | DATA_TYPE.ARRAY;

export type PrimitiveDataType = Exclude<DATA_TYPE, ComplexDataType>;

export default DATA_TYPE;
