import { Fragment } from "react";

// Builders
import Line from "@/builders/Line";

// Helpers
import { getValueFromNonPrimitiveRow } from "./nonPrimitive.helpers";

const NonPrimitive = ({ line }: { line: Line }) => {
  const name = line.getName();
  const value = getValueFromNonPrimitiveRow(line);

  return (
    <div>
      {name && <Fragment>&quot;{name}&quot;:&nbsp;</Fragment>}
      {value}
    </div>
  );
};

export default NonPrimitive;
