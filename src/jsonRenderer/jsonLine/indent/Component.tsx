// Builders
import Line from "@/builders/Line";

// Styles
import styles from './Component.module.css';

interface IndentProps {
  line: Line,
  rowHeight: number
}

function Indent({ line, rowHeight }: IndentProps) {
  const depth = line.getDepth();
  
  return (
    <div className={styles.indent}>
      {Array.from({ length: depth }, (_, index) => (
        <div key={index} className={styles.indentLine} style={{ height: rowHeight }} />
      ))}
    </div>
  );
}

export type { IndentProps };
export default Indent;
