import React from "react";
import {
  IDropDragMap,
  IDragAndDropContextWithMethods,
  IDragAndDropContextProps,
} from "./types";

let _plainContextValue = { content: {}, dropDragMap: {} };

const updateCellContextMap = (newDropDragMap: IDropDragMap) => {
  _plainContextValue = {
    ..._plainContextValue,
    dropDragMap: newDropDragMap,
  };

  listeners.forEach((listener) => {
    listener(_plainContextValue.dropDragMap);
  });
};

const listeners: ((param: IDropDragMap) => void)[] = [];

const subscribe = (listener: (param: IDropDragMap) => void) => {
  listeners.push(listener);
};

let _contextValueWithMethods = {
  ..._plainContextValue,
  updateCellContextMap,
  subscribe,
};

export const DragAndDropContextPure =
  React.createContext<IDragAndDropContextWithMethods>(_contextValueWithMethods);

export function DragAndDropContext({
  content,
  dropDragMap,
  children,
}: IDragAndDropContextProps & { children: React.ReactNode }): ReturnType<
  React.FC<IDragAndDropContextProps>
> {
  _contextValueWithMethods.content = content;
  _contextValueWithMethods.dropDragMap = dropDragMap;

  return (
    <DragAndDropContextPure.Provider value={_contextValueWithMethods}>
      {children}
    </DragAndDropContextPure.Provider>
  );
}
