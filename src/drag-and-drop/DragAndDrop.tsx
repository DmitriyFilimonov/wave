import React from "react";
import { DragAndDropContext } from "./Context";
import { IDragAndDropProps } from "./types";

import { IDropDragMap } from "./types";

let _plainContextValue = { dragTargets: {}, dropDragMap: {} };

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

export function DragAndDrop({
  dragTargets,
  dropDragMap,
  children,
}: IDragAndDropProps & { children: React.ReactNode }): ReturnType<
  React.FC<IDragAndDropProps>
> {
  _contextValueWithMethods.dragTargets = dragTargets;
  _contextValueWithMethods.dropDragMap = dropDragMap;

  return (
    <DragAndDropContext.Provider value={_contextValueWithMethods}>
      {children}
    </DragAndDropContext.Provider>
  );
}
