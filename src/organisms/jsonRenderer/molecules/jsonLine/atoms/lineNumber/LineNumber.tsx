// Styles
import styles from './lineNumber.module.css';

// Builders
import Line from "@/builders/Line";

interface LineNumberProps {
  line: Line,
  shouldShowLineNumber: boolean
}

function LineNumber({ line, shouldShowLineNumber }: LineNumberProps) {
  if(!shouldShowLineNumber)
    return null;

  const lineNumber = line.getLineNumber();

  return <span className={styles.lineNumber}>{lineNumber}</span>;
}

export type { LineNumberProps };
export default LineNumber;
