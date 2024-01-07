// Builders
import Line from "@/builders/Line";

// Types
import type AdaptedJSON from "@/types/adaptedJson";

type CreateLineParams = {
  fieldValue: AdaptedJSON,
  fieldIndex: number,
  fields: AdaptedJSON[],
  depth: number
};

export { CreateLineParams as default };
