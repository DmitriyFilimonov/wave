import React, { useCallback } from "react";
import styled from "styled-components";
import { CellContent, IDraggable } from "./CellContent";
import {
  DragAndDropContextPure,
  ICellContentMap,
  IDragAndDropContext,
} from "./DragAndDropContext";

interface ICellLayoutProps {
  border: string;
}

const CellLayout = styled.div<ICellLayoutProps>`
  border: ${({ border }) => border};
  width: 100px;
  height: 55px;

  & + & {
    margin-top: 5px;
  }
`;

const getOnDropBase =
  (dropTargetId: string, context: IDragAndDropContext) =>
  (e: React.DragEvent<HTMLDivElement>) => {
    const eventPayloadJSON = e.dataTransfer.getData("Text");

    const {
      contentId: dragTargetId,
      parentCellId: dragTargetParentCellId,
    }: IDraggable = JSON.parse(eventPayloadJSON);

    const newCellContentMap = {
      ...context.cellContentMap,
      [dragTargetParentCellId]: undefined,
      [dropTargetId]: dragTargetId,
    };

    context.updateCellContextMap(newCellContentMap);
  };

interface ICellProps {
  cellId: string;
}

const DEFAULT_BORDER = "1px solid green";
const ENTER_BORDER = "3px dotted red";

export const DropZone: React.VFC<ICellProps> = ({ cellId }) => {
  const context = React.useContext(DragAndDropContextPure);
  const [contentId, setContentId] = React.useState(
    context.cellContentMap[cellId]
  );

  React.useEffect(() => {
    context.subscribe((cellContentMap: ICellContentMap) =>
      setContentId(cellContentMap[cellId])
    );
  }, [context, cellId]);

  return <DropZonePure cellId={cellId} contentId={contentId} />;
};

export const DropZonePure: React.VFC<
  ICellProps & { contentId: string | undefined }
> = ({ cellId: dropTargetId, contentId }) => {
  const context = React.useContext(DragAndDropContextPure);

  const onDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      getOnDropBase(dropTargetId, context)(e);
      setBorder(DEFAULT_BORDER);
    },
    [dropTargetId, context.cellContentMap]
  );

  const [border, setBorder] = React.useState<
    typeof DEFAULT_BORDER | typeof ENTER_BORDER
  >(DEFAULT_BORDER);

  const onDragEnter = useCallback(() => setBorder(ENTER_BORDER), []);

  const onDragLeave = useCallback(() => setBorder(DEFAULT_BORDER), []);

  return (
    <CellLayout
      onDragOver={(e) => {
        e.preventDefault();
      }}
      border={border}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <CellContent contentId={contentId} parentCellId={dropTargetId} />
    </CellLayout>
  );
};
