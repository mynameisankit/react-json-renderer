import { useCallback } from 'react';

// Components
import LineContent from './molecules/lineContent';
import ToggleChildrenButton from './molecules/toggleChildrenButton';
import LineNumber from './atoms/lineNumber';
import Indent from './atoms/indent';

// Helpers
import { shouldShowToggleButton } from './jsonLine.helpers';

// Styles
import styles from './jsonLine.module.css';

// Types
import type { ItemData } from '../../jsonRenderer.helpers.types';

interface JSONLineProps {
  index: number,
  style: object,
  data: ItemData,
};

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

  const handleToggleCollapse = useCallback(() => handleToggleLineCollapse(index), [handleToggleLineCollapse]);

  return (
    <div className={styles.jsonLine} style={style}>
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
