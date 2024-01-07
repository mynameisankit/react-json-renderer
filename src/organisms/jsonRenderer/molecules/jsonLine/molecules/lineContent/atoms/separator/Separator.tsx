// Helpers
import { shouldShowComma } from "./separator.helpers";

// Builders
import Line from "@/builders/Line";

// Types
import type { ClosingSeparator } from "@/types/separator";

const Separator = ({ line }: { line: Line }) => {
  const value = line.getValue() as ClosingSeparator;
  const showComma = shouldShowComma(line);

  return (
    <div>
      {value}
      {showComma ? "," : ""}
    </div>
  );
};

export default Separator;
