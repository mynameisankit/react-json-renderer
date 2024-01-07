// Builders
import Line from "@/builders/Line";

// Styles
import styles from './Component.module.css';

type ToggleChildrenButtonProps = {
  line: Line, 
  onToggleCollapsed: () => void,
};

const ToggleChildrenButton = ({ onToggleCollapsed, line }: ToggleChildrenButtonProps) => {
  const label = line.isExpanded() ? 'Collapse' : 'Expand';

  return (
    <button
      aria-label={label}
      className={styles.toggleChildrenButton}
      onClick={onToggleCollapsed}
      type="button"
    >
      {line.isExpanded() ? '−' : '+'}
    </button>
  );
};

export default ToggleChildrenButton;
