// Lodash
import _reduce from "lodash/reduce";

// Helpers
import createLines from "./createLines";

// Builders
import Line from "@/builders/Line";

// Types
import type AdaptedJSON from "@/types/adaptedJson";
import type CreateLineParams from "../types/createLineParams";

const accumulateChildren = ({
  accumulator,
  fieldValue,
  fieldIndex,
  fields,
  depth,
}: CreateLineParams & {
  accumulator: {
    childrenLines: Line[],
    previousLineNumber: number,
  },
}): ({
  childrenLines: Line[],
  previousLineNumber: number,
}) => {
  const children = createLines({
    depth,
    fieldValue,
    fieldIndex,
    fields,
    lineNumberOffset: accumulator.previousLineNumber,
  });

  accumulator.childrenLines.push(...children);
  accumulator.previousLineNumber += fieldValue.size;

  return accumulator;
};

const createChildrenLines = (line: Line): Line[] => {
  const original = line.getOriginal() as AdaptedJSON[] | undefined;
  const depth = line.getDepth();
  const lineNumber = line.getLineNumber() || 0;

  const { childrenLines } = _reduce(original,
    (accumulator, fieldValue, index, fields) =>
      accumulateChildren({
        accumulator,
        fieldValue,
        fieldIndex: index,
        fields,
        depth: depth + 1,
      }),
    {
      childrenLines: [] as Line[],
      previousLineNumber: lineNumber,
    }
  );
  return childrenLines;
};

export default createChildrenLines;
