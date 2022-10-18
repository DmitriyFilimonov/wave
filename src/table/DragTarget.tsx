import React from "react";
import { DragAndDropContextPure } from "./DragAndDropContext";
import { IDraggable } from "./types";

export const DragTarget: React.VFC<IDraggable> = ({
  parentCellId,
  contentId,
}) => {
  const context = React.useContext(DragAndDropContextPure);

  const ContentComponent = React.useCallback(
    contentId && context.content
      ? context.content[contentId] || (() => null)
      : () => null,
    [contentId, context.content]
  );

  return <ContentComponent parentCellId={parentCellId} contentId={contentId} />;
};
