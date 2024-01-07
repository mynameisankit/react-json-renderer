// Types
import type { renderKey } from '../Component.types';

// Builders
import Line from "@/builders/Line";

// Helpers
import { renderPrimitiveValue } from './Component.utils';

interface PrimitiveProps {
  line: Line,
  renderKey: renderKey
}

const Primitive = ({ line, renderKey }: PrimitiveProps) => {
  const name = line.getName();
  const last = line.isLast();

  const renderedPrimitiveValue = renderPrimitiveValue(line);
  const valueClassName = `jsonRenderer${line.getDataType().toLowerCase()}`;

  return (
    <div>
      {name && renderKey(name)}

      <span className={valueClassName}>{renderedPrimitiveValue}</span>
      {!last && ","}
    </div>
  );
};

export type { PrimitiveProps };
export default Primitive;
