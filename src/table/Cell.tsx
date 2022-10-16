import React from "react";
import { getCellContentMap, updateCellContentMap } from "./contentByCellMap";
import styled from "styled-components";
import { CellContent, IDraggable } from "./CellContent";

const CellLayout = styled.div`
  border: 1px solid green;
  width: 100px;
  height: 55px;

  & + & {
    margin-top: 5px;
  }
`;

interface ICellProps {
  cellId: string;
  contentId: string | undefined;
  rerenderTable: React.DispatchWithoutAction;
}

export const Cell: React.VFC<ICellProps> = React.memo(
  ({ cellId: dropTargetId, contentId, rerenderTable }) => {
    return (
      <CellLayout
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDrop={(e) => {
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
        }}
      >
        <CellContent contentId={contentId} parentCellId={dropTargetId} />
      </CellLayout>
    );
  }
);
