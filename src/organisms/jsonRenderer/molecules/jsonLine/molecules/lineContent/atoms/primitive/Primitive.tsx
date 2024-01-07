// Types
import type { renderKey } from "../../lineContent.types";

// Builders
import Line from "@/builders/Line";

// Helpers
import { renderPrimitiveValue } from "./primitive.helpers";

interface PrimitiveProps {
  line: Line,
  renderKey: renderKey
};

const Primitive = ({ line, renderKey }: PrimitiveProps) => {
  const name = line.getName();
  const last = line.isLast();

  const renderedPrimitiveValue = renderPrimitiveValue(line);

  return (
    <div>
      {name && renderKey(name)}

      <span>{renderedPrimitiveValue}</span>
      {!last && ","}
    </div>
  );
};

export type { PrimitiveProps };
export default Primitive;
