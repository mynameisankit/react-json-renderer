// Constants
import DATA_TYPE, { ComplexDataType } from "@/constants/dataType";

// TODO: Think Better Approach
type AdaptedProperty = {
  name?: string,
  size: number,
  value: string | boolean | null | number,
  dataType: Exclude<DATA_TYPE, ComplexDataType>,
} | {
  name?: string,
  size: number,
  value: AdaptedProperty[],
  dataType: ComplexDataType,
};

export type { AdaptedProperty as default };
