import { useState, useCallback, useMemo, useEffect } from "react";

// Builders
import Line from '@/builders/Line';

// Helpers
import adaptJson from './adaptJson.utils';
import createInitialLines from './createInitialLines.utils';
import toggleLineCollapse from './toggleLineCollapse.utils';
import { updateInitialLinesEffect } from './general.utils';

const useJsonLines = (json: unknown) => {
  const adaptedJson = useMemo(() => adaptJson(json), [json]);

  const [lines, setLines] = useState<readonly Line[]>(() => createInitialLines(adaptedJson));

  useEffect(() => updateInitialLinesEffect(adaptedJson, setLines), [adaptedJson]);

  const handleToggleLineCollapse = useCallback(
    (lineIndex: number) => toggleLineCollapse(lineIndex, lines, setLines),
    [lines]
  );
  
  return { lines, handleToggleLineCollapse };
};

export default useJsonLines;
