// Builders
import Line from "@/builders/Line";

// Helpers
import { getIcon } from "./toggleChildrenButton.helpers";

// Styles
import styles from './toggleChildrenButton.module.css';

type ToggleChildrenButtonProps = {
  line: Line, 
  onToggleCollapsed: () => void,
};

const ToggleChildrenButton = ({ onToggleCollapsed, line }: ToggleChildrenButtonProps) => {
  const Icon = getIcon(line);

  return <Icon onClick={onToggleCollapsed} className={styles.toggleChildrenButton} />;
};

export default ToggleChildrenButton;
