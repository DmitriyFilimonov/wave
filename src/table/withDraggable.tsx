import React from "react";
import { IDraggable } from "./types";
import { Draggable } from "./styled";

let clientX = 0;
let clientY = 0;

const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
  if (e.clientX !== clientX || e.clientY !== clientY) {
    clientX = e.clientX;
    clientY = e.clientY;
  } else {
    e.preventDefault();
  }
};

export const withDraggable =
  (DragTarget: React.FC): React.VFC<IDraggable> =>
  ({ parentDropTargetId, dragTargetId }) => {
    const onDragStart = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData(
          "Text",
          JSON.stringify({ parentDropTargetId, dragTargetId })
        );
      },
      [{ parentDropTargetId, dragTargetId }]
    );

    return (
      <Draggable draggable="true" onDragStart={onDragStart} onDrag={onDrag}>
        <DragTarget />
      </Draggable>
    );
  };
