import { useMemo } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
// Lodash
import _size from 'lodash/size';

// Hooks
import useJsonLines from "./hooks/useJsonLines";

// Helpers
import { getLineKey, getAutoSizerProp, getItemData } from "./jsonRenderer.helpers";

// Components
import JSONLine from "./molecules/jsonLine";

export interface JSONRendererProps {
  json: object,
  width: number,
  height: number,
  nonce: string,
  rowHeight: number,
  shouldShowLineNumber: boolean,
}

const JSONRenderer = (props: JSONRendererProps) => {
  const { json, width, height, nonce, rowHeight, shouldShowLineNumber = false } = props;

  const { lines, handleToggleLineCollapse } = useJsonLines(json);

  const numberOfLines = _size(lines);

  const itemData = useMemo(() => getItemData({
    lines,
    rowHeight,
    handleToggleLineCollapse,
    shouldShowLineNumber,
}), [lines, rowHeight]);

  const autoSizerProps = useMemo(() => getAutoSizerProp({ nonce }), [nonce]);

  // TODO: Generalise props using height, width props
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

export default JSONRenderer;
