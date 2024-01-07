// Types
import type { renderKey } from '../Component.types';

// Builders
import Line from "@/builders/Line";

// Helpers
import { getValueFromNonPrimitiveRow } from './Component.utils';

interface NonPrimitiveProps {
  line: Line,
  renderKey: renderKey
}

const NonPrimitive = ({ line, renderKey }: NonPrimitiveProps) => {
  const name = line.getName();
  const value = getValueFromNonPrimitiveRow(line);

  return (
    <div>
      {name && renderKey(name)}
      {value}
    </div>
  );
};

export default NonPrimitive;
