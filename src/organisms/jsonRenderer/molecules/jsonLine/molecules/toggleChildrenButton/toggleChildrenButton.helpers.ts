import {
  CiSquarePlus as ExpandIcon,
  CiSquareMinus as CollapseIcon
} from "react-icons/ci";

// Builders
import Line from "@/builders/Line";

export const getIcon = (line: Line) => {
  const expanded = line.isExpanded();

  const icon = expanded ? CollapseIcon : ExpandIcon;
  return icon;
};
