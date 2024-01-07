// Constants
import DATA_TYPE from "@/constants/dataType";

// Builders
import Line from "@/builders/Line";

// Components
import Primitive from "./atoms/primitive";
import NonPrimitive from "./atoms/nonPrimitive";
import Separator from "./atoms/separator";

const COMPONENT_BY_DATA_TYPE = {
  [DATA_TYPE.STRING]: Primitive,
  [DATA_TYPE.BOOLEAN]: Primitive,
  [DATA_TYPE.NUMBER]: Primitive,
  [DATA_TYPE.NULL]: Primitive,
  [DATA_TYPE.OBJECT]: NonPrimitive,
  [DATA_TYPE.ARRAY]: NonPrimitive,
  [DATA_TYPE.CLOSING_SEPARATOR]: Separator,
};

export const getComponent = (line: Line) => {
  const dataType = line.getDataType();

  const component = COMPONENT_BY_DATA_TYPE[dataType];
  return component;
};
