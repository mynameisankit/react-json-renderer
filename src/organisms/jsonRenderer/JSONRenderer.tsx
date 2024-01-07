import { useMemo } from "react";
import { FixedSizeList as List } from "react-window";

// Types
import type { ItemData } from './jsonRenderer.helpers.types';

// Lodash
import _size from 'lodash/size';

// Hooks
import useJsonLines from "./hooks/useJsonLines";

// Helpers
import { getLineKey } from "./jsonRenderer.helpers";

// Components
import JSONLine from "./molecules/jsonLine";

// Constants
import { DEFAULT_ROW_HEIGHT } from "./jsonRenderer.constants";

interface JSONRendererProps {
  json?: unknown,
  width: number,
  height: number,
  rowHeight?: number,
  shouldShowLineNumber?: boolean,
  shouldRemoveQuotesFromKeys?: boolean
}

const JSONRenderer = ({ 
  json, 
  width, 
  height, 
  rowHeight = DEFAULT_ROW_HEIGHT, 
  shouldShowLineNumber = false, 
  shouldRemoveQuotesFromKeys = false
}: JSONRendererProps) => {
  const { lines, handleToggleLineCollapse } = useJsonLines(json);

  const numberOfLines = _size(lines);

  const itemData = useMemo((): ItemData => ({
    lines,
    rowHeight,
    handleToggleLineCollapse,
    shouldShowLineNumber,
    shouldRemoveQuotesFromKeys,
  }), [
    lines, 
    rowHeight, 
    shouldShowLineNumber, 
    handleToggleLineCollapse,
    shouldRemoveQuotesFromKeys
  ]);

  return (
    <List
      height={height}
      width={width}
      itemSize={rowHeight}
      itemCount={numberOfLines}
      itemData={itemData}
      overscanCount={5}
      itemKey={getLineKey}
    >
      {JSONLine}
    </List>
  );
};

export type { JSONRendererProps};
export default JSONRenderer;
