import { useMemo } from "react";

// Builders
import Line from "@/builders/Line";

// Helpers
import { getComponent, makeRenderKey } from "./lineContent.helpers";

interface LineContent {
  line: Line,
  shouldRemoveQuotesFromKeys: boolean
};

const LineContent = ({ line, shouldRemoveQuotesFromKeys }: LineContent) => {
  const renderKey = useMemo(() => makeRenderKey(shouldRemoveQuotesFromKeys), [shouldRemoveQuotesFromKeys]);

  const Component = getComponent(line);

  return <Component line={line} renderKey={renderKey} />;
};

export default LineContent;
