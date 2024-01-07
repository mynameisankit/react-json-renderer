// Constants
import DATA_TYPE, { PrimitiveDataType, ComplexDataType } from "@/constants/dataType";

type PrimtiveJSON = {
  name?: string,
  size: number,
  value: string | boolean | null | number,
  dataType: PrimitiveDataType,
};

type ComplexJSON = {
  name?: string,
  size: number,
  value: AdaptedJSON[],
  dataType: ComplexDataType,
};

type AdaptedJSON = ComplexJSON | PrimtiveJSON;

export type { AdaptedJSON as default, ComplexJSON, PrimtiveJSON };
