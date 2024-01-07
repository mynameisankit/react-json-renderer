// Builders
import Line from "@/builders/Line";

// Helpers
import createInitialLines from "./createInitialLines";

// Types
import AdaptedJSON from "@/types/adaptedJson";
import SetLines from '../types/setLines';

export const copyLine = (line: Line): Line => {
  const dataType = line.getDataType();

  const copiedLine = Object.assign(new Line(dataType), line);
  return copiedLine;
};

export const updateInitialLinesEffect = (adaptedJson: AdaptedJSON, setLines: SetLines) => {
  const initialLines = createInitialLines(adaptedJson);

  setLines(initialLines);
  return;
};
