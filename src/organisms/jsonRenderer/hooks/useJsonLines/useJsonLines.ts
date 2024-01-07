import { useState, useCallback, useMemo } from "react";
import { useUpdateEffect } from 'react-use';

// Builders
import Line from '@/builders/Line';

// Helpers
import adaptJson from "./helpers/adaptJson";
import createInitialLines from "./helpers/createInitialLines";
import toggleLineCollapse from "./helpers/toggleLineCollapse";
import { updateInitialLinesEffect } from "./helpers/general";

const useJsonLines = (json: unknown) => {
  const adaptedJson = useMemo(() => adaptJson(json), [json]);

  const getInitialLines = () => createInitialLines(adaptedJson);

  const [lines, setLines] = useState<readonly Line[]>(getInitialLines);

  useUpdateEffect(() => updateInitialLinesEffect(adaptedJson, setLines), [json]);

  const handleToggleLineCollapse = useCallback(
    (lineIndex: number) => toggleLineCollapse(lineIndex, lines, setLines),
    [lines]
  );
  
  return { lines, handleToggleLineCollapse };
};

export default useJsonLines;
