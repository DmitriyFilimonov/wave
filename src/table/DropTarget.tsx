import React, { useCallback } from "react";
import { DragTarget } from "./DragTarget";
import { DragAndDropContextPure } from "./DragAndDropContext";
import { DropTargetLayout } from "./styled";
import {
  IDropDragMap,
  IDragTargetProps,
  IDragAndDropContextWithMethods,
  IDraggable,
} from "./types";

const getOnDropBase =
  (dropTargetId: string, context: IDragAndDropContextWithMethods) =>
  (e: React.DragEvent<HTMLDivElement>) => {
    const eventPayloadJSON = e.dataTransfer.getData("Text");

    const {
      contentId: dragTargetId,
      parentCellId: dragTargetParentCellId,
    }: IDraggable = JSON.parse(eventPayloadJSON);

    const newCellContentMap = {
      ...context.dropDragMap,
      [dragTargetParentCellId]: undefined,
      [dropTargetId]: dragTargetId,
    };

    context.updateCellContextMap(newCellContentMap);
  };

const DEFAULT_BORDER = "1px solid green";
const ENTER_BORDER = "3px dotted red";

const DropTargetPure: React.VFC<
  IDragTargetProps & { contentId: string | undefined }
> = ({ dropTargetId: dropTargetId, contentId }) => {
  const context = React.useContext(DragAndDropContextPure);

  const onDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      getOnDropBase(dropTargetId, context)(e);
      setBorder(DEFAULT_BORDER);
    },
    [dropTargetId, context.dropDragMap]
  );

  const [border, setBorder] = React.useState<
    typeof DEFAULT_BORDER | typeof ENTER_BORDER
  >(DEFAULT_BORDER);

  const onDragEnter = useCallback(() => setBorder(ENTER_BORDER), []);

  const onDragLeave = useCallback(() => setBorder(DEFAULT_BORDER), []);

  return (
    <DropTargetLayout
      onDragOver={(e) => {
        e.preventDefault();
      }}
      border={border}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <DragTarget contentId={contentId} parentCellId={dropTargetId} />
    </DropTargetLayout>
  );
};

export const DropTargetWithSubscription: React.VFC<IDragTargetProps> = ({
  dropTargetId: cellId,
}) => {
  const context = React.useContext(DragAndDropContextPure);
  const [contentId, setContentId] = React.useState(context.dropDragMap[cellId]);

  React.useEffect(() => {
    context.subscribe((cellContentMap: IDropDragMap) =>
      setContentId(cellContentMap[cellId])
    );
  }, [context, cellId]);

  return <DropTargetPure dropTargetId={cellId} contentId={contentId} />;
};
