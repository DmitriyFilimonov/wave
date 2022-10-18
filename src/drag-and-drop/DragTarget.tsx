import React from "react";
import { DragAndDropContext } from "./Context";
import { IDraggable } from "./types";

export const DragTarget: React.VFC<IDraggable> = ({
  parentDropTargetId,
  dragTargetId,
}) => {
  const doesParentCellHaveContent = !!dragTargetId;

  if (!doesParentCellHaveContent) {
    return null;
  }

  const context = React.useContext(DragAndDropContext)!;

  const ContentComponent = React.useCallback(
    context.dragTargets[dragTargetId],
    [dragTargetId, context.dragTargets]
  );

  return (
    <ContentComponent
      parentDropTargetId={parentDropTargetId}
      dragTargetId={dragTargetId}
    />
  );
};
