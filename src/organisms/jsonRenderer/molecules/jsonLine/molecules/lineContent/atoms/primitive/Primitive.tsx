import { Fragment } from "react";

// Builders
import Line from "@/builders/Line";

// Helpers
import { renderPrimitiveValue } from "./primitive.helpers";

const Primitive = ({ line }: { line: Line }) => {
  const name = line.getName();
  const last = line.isLast();

  const renderedPrimitiveValue = renderPrimitiveValue(line);

  return (
    <div>
      {name && (
        <Fragment>
          <span>&quot;{name}&quot;:</span>&nbsp;
        </Fragment>
      )}
      <span>{renderedPrimitiveValue}</span>
      {!last && ","}
    </div>
  );
};

export default Primitive;
