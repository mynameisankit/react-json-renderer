import { ComponentType, Fragment, ReactNode } from 'react';

// Constants
import DATA_TYPE from "@/constants/dataType";

// Builders
import Line from "@/builders/Line";
import type { renderKey } from './Component.types';

// Components
import Primitive from './primitive/Component';
import NonPrimitive from './nonPrimitive/Component';
import Separator from './separator/Component';

const COMPONENT_BY_DATA_TYPE = {
  [DATA_TYPE.STRING]: Primitive,
  [DATA_TYPE.BOOLEAN]: Primitive,
  [DATA_TYPE.NUMBER]: Primitive,
  [DATA_TYPE.NULL]: Primitive,
  [DATA_TYPE.OBJECT]: NonPrimitive,
  [DATA_TYPE.ARRAY]: NonPrimitive,
  [DATA_TYPE.CLOSING_SEPARATOR]: Separator,
};

export const getComponent = (line: Line): ComponentType<{ line: Line, renderKey: renderKey }> => {
  const dataType = line.getDataType() as Exclude<DATA_TYPE, DATA_TYPE.UNDEFINED>;

  const component = COMPONENT_BY_DATA_TYPE[dataType];
  return component;
};

export const makeRenderKey = (shouldRemoveQuotesFromKeys: boolean) => (key: string | number): ReactNode => {
  if (shouldRemoveQuotesFromKeys)
    return (
      <Fragment>
        <span className="jsonRendererKey">{key}:</span>&nbsp;
      </Fragment>
    );

  return (
    <Fragment>
      <span className="jsonRendererKey">&quot;{key}&quot;:</span>&nbsp;
    </Fragment>
  );
};
