// Lodash
import _values from "lodash/values";
import _map from "lodash/map";
import _noop from "lodash/noop";
import _slice from "lodash/slice";
import _findIndex from "lodash/findIndex";

// Builders
import Line from "@/builders/Line";

// Constants
import DATA_TYPE from "@/constants/dataType";
import { EMPTY_ARRAY } from '@/constants/general';

// Helpers
import { copyLine } from "./general";
import createChildrenLines from "./createChildrenLines";

// Types
import SetLines from '../types/setLines';

const getPartitionsOnExpandingLine = (lineIndex: number, lines: readonly Line[]) => {
  const partBeforeWithoutLine = _slice(lines, 0, lineIndex);
  const partAfterWithMatchingClosingSeparator = _slice(lines, lineIndex + 1);

  const partitionsOnExpandingLine = {
    partBeforeWithoutLine,
    partAfterWithMatchingClosingSeparator,
  };
  return partitionsOnExpandingLine;
};

const expandLine = (
  lineIndex: number,
  lines: readonly Line[],
  setLines: SetLines,
) => {
  const line = lines[lineIndex];

  const {
    partBeforeWithoutLine = EMPTY_ARRAY,
    partAfterWithMatchingClosingSeparator = EMPTY_ARRAY,
  } = getPartitionsOnExpandingLine(lineIndex, lines);

  const updatedLine = copyLine(line).setExpanded(true);
  const childrenLines = createChildrenLines(line);

  const updatedLines = [
    ...partBeforeWithoutLine,
    updatedLine,
    ...childrenLines,
    ...partAfterWithMatchingClosingSeparator,
  ];

  setLines(updatedLines);
};

const matchClosingSeparatorForDepth = (line: Line, depthToMatch: number) => {
  const dataType = line.getDataType();
  const lineDepth = line.getDepth();

  const matchingSeparator =
    dataType === DATA_TYPE.CLOSING_SEPARATOR && lineDepth === depthToMatch;
  return matchingSeparator;
};

const getIndexOfClosingSeparator = (lineIndex: number, lines: readonly Line[]) => {
  const line = lines[lineIndex];

  const depth = line.getDepth();

  const indexOfClosingSeparator = _findIndex(
    lines,
    (line) => matchClosingSeparatorForDepth(line, depth),
    lineIndex + 1
  );
  return indexOfClosingSeparator;
};

const getPartitionsOnCollapsingLine = (lineIndex: number, lines: readonly Line[]) => {
  const indexOfClosingSeparator = getIndexOfClosingSeparator(lineIndex, lines);

  const partBeforeWithoutLine = _slice(lines, 0, lineIndex);
  const partAfterWithMatchingClosingSeparator = _slice(
    lines,
    indexOfClosingSeparator
  );

  const partitionsOnCollapsingLine = {
    partBeforeWithoutLine,
    partAfterWithMatchingClosingSeparator,
  };
  return partitionsOnCollapsingLine;
};

const collapseLine = (
  lineIndex: number,
  lines: readonly Line[],
  setLines: SetLines,
) => {
  const line = lines[lineIndex];

  const {
    partBeforeWithoutLine = EMPTY_ARRAY,
    partAfterWithMatchingClosingSeparator = EMPTY_ARRAY,
  } = getPartitionsOnCollapsingLine(lineIndex, lines);

  const updatedLine = copyLine(line).setExpanded(false);

  const updatedLines = [
    ...partBeforeWithoutLine,
    updatedLine,
    ...partAfterWithMatchingClosingSeparator,
  ];

  setLines(updatedLines);
};

const isLineAtIndexExpanded = (lineIndex: number, lines: readonly Line[]): boolean => {
  const line = lines[lineIndex];

  const expanded = line.isExpanded();
  return expanded;
};

const toggleLineCollapse = (lineIndex: number, lines: readonly Line[], setLines: SetLines): void => {
  const lineExpanded = isLineAtIndexExpanded(
    lineIndex,
    lines
  );

  if (lineExpanded) {
    collapseLine(
      lineIndex,
      lines,
      setLines,
    );
    return;
  }

  expandLine(
    lineIndex,
    lines,
    setLines,
  );
};

export default toggleLineCollapse;
