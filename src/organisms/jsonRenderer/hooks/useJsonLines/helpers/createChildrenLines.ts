// Lodash
import _reduce from "lodash/reduce";

// Helpers
import createLines from "./createLines";

// Builders
import Line from "@/builders/Line";

// Types
import type AdaptedProperty from "@/types/adaptedProperty";

const accumulateChildren = ({
  accumulator,
  propertyValue,
  propertyIndex,
  properties,
  depth,
}: {
  // Types repeating
  accumulator: {
    childrenLines: Line[],
    previousLineNumber: number,
  },
  propertyValue: AdaptedProperty,
  propertyIndex: number,
  properties: AdaptedProperty[],
  depth: number,
}): ({
  childrenLines: Line[],
  previousLineNumber: number,
}) => {
  const children = createLines({
    propertyValue,
    depth,
    propertyIndex,
    properties,
    lineNumberOffset: accumulator.previousLineNumber,
  });

  accumulator.childrenLines.push(...children);
  accumulator.previousLineNumber += propertyValue.size;
  return accumulator;
};

const createChildrenLines = (line: Line): Line[] => {
  const original = line.getOriginal() as AdaptedProperty[] | undefined;
  const depth = line.getDepth();
  const lineNumber = line.getLineNumber() || 0;

  const { childrenLines: objectChildrenLines } = _reduce(original,
    (accumulator, propertyValue, index, properties) =>
      accumulateChildren({
        accumulator,
        propertyValue,
        propertyIndex: index,
        properties,
        depth: depth + 1,
      }),
    {
      childrenLines: [] as Line[],
      previousLineNumber: lineNumber,
    }
  );
  return objectChildrenLines;
};

export default createChildrenLines;
