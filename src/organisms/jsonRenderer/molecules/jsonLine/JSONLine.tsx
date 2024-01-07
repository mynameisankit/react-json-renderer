import { useCallback } from 'react';

// Components
import LineContent from './molecules/lineContent';
import ToggleChildrenButton from './molecules/toggleChildrenButton';

// Helpers
import { renderIndentLines, shouldShowToggleButton } from './jsonLine.helpers';

// Styles
import styles from './jsonLine.module.css';

// Types
import type { ItemData } from '../../jsonRenderer.helpers.types';

// How to style?
const JSONLine = ({
    index,
    style,
    data: { lines, rowHeight, handleToggleLineCollapse, shouldShowLineNumber = false },
} : {
    index: number,
    style: object,
    data: ItemData,
}) => {
    const line = lines[index];

    const showToggleButton = shouldShowToggleButton(line);

    const handleToggleCollapse = useCallback(() => handleToggleLineCollapse(index), [handleToggleLineCollapse]);

    const lineNumber = line.getLineNumber();

    return (
      <div className={styles.jsonLine} style={style}>
        {/* Move to Component */}
        {shouldShowLineNumber && <div style={{ width: '20px', backgroundColor: 'grey', height: '100%' }}>{lineNumber}</div>}

        <div className={styles.jsonField}>
          <div className={styles.indentLineContainer}>{renderIndentLines(line, rowHeight)}</div>

          {showToggleButton && (
            <ToggleChildrenButton
              onToggleCollapsed={handleToggleCollapse}
              line={line}
            />
          )}

          <LineContent line={line} />
        </div>
      </div>
    );
};

export default JSONLine;
