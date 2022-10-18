import React from "react";
import { IDraggable } from "./CellContent";

interface IContent {
  [key: string]: React.FC<IDraggable> | React.VFC<IDraggable> | undefined;
}

export interface ICellContentMap {
  [key: string]: string | undefined;
}

interface IDragAndDropContextProps {
  content: IContent;
  cellContentMap: ICellContentMap;
}

interface IDragAndDropContextMethods {
  updateCellContextMap: typeof updateCellContextMap;
  subscribe: (listener: (param: ICellContentMap) => void) => void;
}

export interface IDragAndDropContext
  extends IDragAndDropContextProps,
    IDragAndDropContextMethods {}

let _plainValue = { content: {}, cellContentMap: {} };

const updateCellContextMap = (
  newCellContentMap: IDragAndDropContextProps["cellContentMap"]
) => {
  _plainValue = {
    ..._plainValue,
    cellContentMap: newCellContentMap,
  };
  listeners.forEach((listener) => {
    listener(_plainValue.cellContentMap);
  });
};

const listeners: ((param: ICellContentMap) => void)[] = [];

const subscribe = (listener: (param: ICellContentMap) => void) => {
  listeners.push(listener);
};

let value = {
  ..._plainValue,
  updateCellContextMap,
  subscribe,
};

export let DragAndDropContextPure: React.Context<IDragAndDropContext> =
  React.createContext<IDragAndDropContext>(value);

export function DragAndDropContext({
  content,
  cellContentMap,
  children,
}: IDragAndDropContextProps & { children: React.ReactNode }): ReturnType<
  React.FC<IDragAndDropContextProps>
> {
  value.content = content;
  value.cellContentMap = cellContentMap;

  return (
    <DragAndDropContextPure.Provider value={value}>
      {children}
    </DragAndDropContextPure.Provider>
  );
}
