// Builders
import Line from "@/builders/Line";

// Helpers
import { getIcon } from "./toggleChildrenButton.helpers";

type ToggleChildrenButtonProps = {
  line: Line, 
  onToggleCollapsed: () => void,
};

const ToggleChildrenButton = ({ onToggleCollapsed, line }: ToggleChildrenButtonProps) => {
  const Icon = getIcon(line);

  return <Icon onClick={onToggleCollapsed} style={{ marginLeft: '8px', position: 'absolute', zIndex: 1, left: '1px', cursor: 'pointer' }} />;
};

export default ToggleChildrenButton;
