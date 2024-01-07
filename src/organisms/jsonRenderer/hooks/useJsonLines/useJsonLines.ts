import { useState, useCallback, useMemo } from "react";

// Builders
import Line from '@/builders/Line';

// Helpers
import adaptJson from "./helpers/adaptJson";
import createInitialLines from "./helpers/createInitialLines";
import toggleLineCollapse from "./helpers/toggleLineCollapse";

const useJsonLines = (json: object | undefined) => {
  const adaptedJson = useMemo(() => adaptJson(json), [json]);

  const getInitialLines = () => createInitialLines(adaptedJson);

  const [lines, setLines] = useState<Line[]>(getInitialLines);

  const handleToggleLineCollapse = useCallback(
    (lineIndex: number) => toggleLineCollapse(lineIndex, lines, setLines),
    [lines]
  );
  
  return { lines, handleToggleLineCollapse };
};

export default useJsonLines;
