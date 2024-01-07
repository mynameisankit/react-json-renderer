import { useCallback } from 'react';
import type { ListChildComponentProps } from 'react-window';

// Components
import LineContent from './lineContent/Component';
import ToggleChildrenButton from './toggleChildrenButton/Component';
import LineNumber from './lineNumber/Component';
import Indent from './indent/Component';

// Helpers
import { shouldShowToggleButton } from './Component.utils';

// Styles
import styles from './Component.module.css';

// Types
import type { ItemData } from '../Component.types';

type JSONLineProps = ListChildComponentProps<ItemData>;

const JSONLine = ({
  index,
  style,
  data: { 
    lines, 
    rowHeight, 
    handleToggleLineCollapse, 
    shouldShowLineNumber = false,
    shouldRemoveQuotesFromKeys = false
  },
}: JSONLineProps) => {
  const line = lines[index];

  const showToggleButton = shouldShowToggleButton(line);

  const handleToggleCollapse = useCallback(() => handleToggleLineCollapse(index), [handleToggleLineCollapse, index]);

  return (
    <div className={styles.jsonLine} style={Object.fromEntries(Object.entries(style))}>
      <LineNumber line={line} shouldShowLineNumber={shouldShowLineNumber} />

      <div className={styles.jsonField}>
        <Indent line={line} rowHeight={rowHeight} />

        {showToggleButton && (
          <ToggleChildrenButton
            onToggleCollapsed={handleToggleCollapse}
            line={line}
          />
        )}

        <LineContent line={line} shouldRemoveQuotesFromKeys={shouldRemoveQuotesFromKeys} />
      </div>
    </div>
  );
};

export type { JSONLineProps };
export default JSONLine;
