import React from "react";
import { IDragAndDropContextWithMethods } from "./types";

export const DragAndDropContext =
  React.createContext<IDragAndDropContextWithMethods | null>(null);
