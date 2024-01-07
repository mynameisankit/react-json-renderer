import { useMemo, type CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";

// Types
import type { ItemData } from './Component.types';

// Hooks
import useJsonLines from './useJsonLines';

// Helpers
import { getLineKey } from './Component.utils';

// Components
import JSONLine from './jsonLine/Component';

// Constants
import { DEFAULT_ROW_HEIGHT } from './Component.constants';

export type JSONRendererTheme = {
  background?: string;
  color?: string;
  lineNumberBackground?: string;
  lineNumberColor?: string;
  indentGuideColor?: string;
  toggleBackground?: string;
  toggleColor?: string;
  toggleBorderColor?: string;
  keyColor?: string;
  stringColor?: string;
  numberColor?: string;
  booleanColor?: string;
  nullColor?: string;
};

type ThemeVariables = CSSProperties & {
  '--json-renderer-background'?: string;
  '--json-renderer-color'?: string;
  '--json-renderer-line-number-background'?: string;
  '--json-renderer-line-number-color'?: string;
  '--json-renderer-indent-guide-color'?: string;
  '--json-renderer-toggle-background'?: string;
  '--json-renderer-toggle-color'?: string;
  '--json-renderer-toggle-border-color'?: string;
  '--json-renderer-key-color'?: string;
  '--json-renderer-string-color'?: string;
  '--json-renderer-number-color'?: string;
  '--json-renderer-boolean-color'?: string;
  '--json-renderer-null-color'?: string;
};

interface JSONRendererProps {
  json?: unknown,
  width: number,
  height: number,
  rowHeight?: number,
  shouldShowLineNumber?: boolean,
  shouldRemoveQuotesFromKeys?: boolean,
  theme?: JSONRendererTheme,
}

const getThemeVariables = (theme?: JSONRendererTheme): ThemeVariables => ({
  '--json-renderer-background': theme?.background,
  '--json-renderer-color': theme?.color,
  '--json-renderer-line-number-background': theme?.lineNumberBackground,
  '--json-renderer-line-number-color': theme?.lineNumberColor,
  '--json-renderer-indent-guide-color': theme?.indentGuideColor,
  '--json-renderer-toggle-background': theme?.toggleBackground,
  '--json-renderer-toggle-color': theme?.toggleColor,
  '--json-renderer-toggle-border-color': theme?.toggleBorderColor,
  '--json-renderer-key-color': theme?.keyColor,
  '--json-renderer-string-color': theme?.stringColor,
  '--json-renderer-number-color': theme?.numberColor,
  '--json-renderer-boolean-color': theme?.booleanColor,
  '--json-renderer-null-color': theme?.nullColor,
});

const JSONRenderer = ({ 
  json, 
  width, 
  height, 
  rowHeight = DEFAULT_ROW_HEIGHT, 
  shouldShowLineNumber = false, 
  shouldRemoveQuotesFromKeys = false,
  theme,
}: JSONRendererProps) => {
  const { lines, handleToggleLineCollapse } = useJsonLines(json);

  const themeVariables = useMemo(() => getThemeVariables(theme), [theme]);

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
    <div className="jsonRenderer" style={themeVariables}>
      <List
        height={height}
        width={width}
        itemSize={rowHeight}
        itemCount={lines.length}
        itemData={itemData}
        overscanCount={5}
        itemKey={getLineKey}
      >
        {JSONLine}
      </List>
    </div>
  );
};

export type { JSONRendererProps};
export default JSONRenderer;
