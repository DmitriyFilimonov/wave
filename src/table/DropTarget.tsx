import React, { useCallback } from "react";
import { DragTarget } from "./DragTarget";
import { DragAndDropContext } from "./Context";
import { DropTargetLayout } from "./styled";
import {
  IDropDragMap,
  IDragTargetProps,
  IDraggable,
  DropBaseCreatorParams,
} from "./types";

const getOnDropBase =
  ({
    dropTargetId,
    dropDragMap,
    updateCellContextMap,
  }: DropBaseCreatorParams) =>
  (e: React.DragEvent<HTMLDivElement>) => {
    const eventPayloadJSON = e.dataTransfer.getData("Text");

    const { dragTargetId, parentDropTargetId }: IDraggable =
      JSON.parse(eventPayloadJSON);

    console.log({
      dragTargetId,
      parentDropTargetId,
      dropTargetId,
    });

    const newCellContentMap = {
      ...dropDragMap,
      [parentDropTargetId]: undefined,
      [dropTargetId]: dragTargetId,
    };

    updateCellContextMap && updateCellContextMap(newCellContentMap);
  };

const DEFAULT_BORDER = "1px solid green";
const ENTER_BORDER = "3px dotted red";

const DropTargetPure: React.VFC<
  IDragTargetProps & { dragTargetId: string | undefined }
> = ({ dropTargetId: dropTargetId, dragTargetId }) => {
  const context = React.useContext(DragAndDropContext);

  const [dropDragMap, setDropDragMap] = React.useState(context?.dropDragMap);

  React.useEffect(() => {
    context?.subscribe((dropDragMap: IDropDragMap) =>
      setDropDragMap(dropDragMap)
    );
  }, [context]);

  const onDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const onDropBase = getOnDropBase({
        dropTargetId,
        dropDragMap,
        updateCellContextMap: context?.updateCellContextMap,
      });

      onDropBase(e);

      setBorder(DEFAULT_BORDER);
    },
    [dropTargetId, dropDragMap]
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
      <DragTarget
        dragTargetId={dragTargetId}
        parentDropTargetId={dropTargetId}
      />
    </DropTargetLayout>
  );
};

export const DropTargetWithSubscription: React.VFC<IDragTargetProps> = ({
  dropTargetId,
}) => {
  const context = React.useContext(DragAndDropContext);
  const [dragTargetId, setDragTargetId] = React.useState(
    context?.dropDragMap[dropTargetId]
  );

  React.useEffect(() => {
    context?.subscribe((dropDragMap: IDropDragMap) =>
      setDragTargetId(dropDragMap[dropTargetId])
    );
  }, [context, dropTargetId]);

  return (
    <DropTargetPure dropTargetId={dropTargetId} dragTargetId={dragTargetId} />
  );
};
