import type { ListItemKeySelector } from "react-window";

// Types
import type { ItemData } from "./jsonRenderer.helpers.types";

export const getLineKey: ListItemKeySelector<ItemData> = (index, data) => {
  const { lines } = data;

  const line = lines[index];

  const lineKey = line.getKey();
  return lineKey;
};
