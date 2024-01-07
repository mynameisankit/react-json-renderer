// Builders
import Line from "@/builders/Line";

// Helpers
import { getComponent } from "./lineContent.helpers";

const LineContent = ({
  line
}: {
  line: Line 
}) => {
  const Component = getComponent(line);

  return <Component line={line} />;
};

export default LineContent;
