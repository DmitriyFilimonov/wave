import React, { useCallback } from "react";
import { getCellContentMap, updateCellContentMap } from "./contentByCellMap";
import styled from "styled-components";
import { CellContent, IDraggable } from "./CellContent";

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
  (dropTargetId: string, rerenderTable: React.DispatchWithoutAction) =>
  (e: React.DragEvent<HTMLDivElement>) => {
    const eventPayloadJSON = e.dataTransfer.getData("Text");

    const {
      contentId: dragTargetId,
      parentCellId: dragTargetParentCellId,
    }: IDraggable = JSON.parse(eventPayloadJSON);

    const newCellContentMap = {
      ...getCellContentMap(),
      [dragTargetParentCellId]: undefined,
      [dropTargetId]: dragTargetId,
    };

    updateCellContentMap(newCellContentMap);

    rerenderTable();
  };

interface ICellProps {
  cellId: string;
  contentId: string | undefined;
  rerenderTable: React.DispatchWithoutAction;
}

const DEFAULT_BORDER = "1px solid green";
const ENTER_BORDER = "3px dotted red";

export const Cell: React.VFC<ICellProps> = React.memo(
  ({ cellId: dropTargetId, contentId, rerenderTable }) => {
    const onDrop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        getOnDropBase(dropTargetId, rerenderTable)(e);
        setBorder(DEFAULT_BORDER);
      },
      [dropTargetId, rerenderTable]
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
  }
);
