import React from "react";
import styled from "styled-components";

const Draggable = styled.div`
  width: 50px;
  height: 30px;
  border: 1px solid red;
`;

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

const getOnDragStart =
  ({ parentCellId, contentId }: IDraggable) =>
  (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("Text", JSON.stringify({ parentCellId, contentId }));
  };

const withDraggable =
  (Content: React.FC): React.VFC<IDraggable> =>
  (props) => {
    const onDragStart = React.useCallback(getOnDragStart(props), [props]);

    return (
      <Draggable draggable="true" onDragStart={onDragStart} onDrag={onDrag}>
        <Content />
      </Draggable>
    );
  };

const ADSR: React.VFC = () => <>ADSR</>;

const content = {
  content: withDraggable(ADSR),
};

export interface IDraggable {
  parentCellId: string;
  contentId: string | undefined;
}

export const CellContent: React.VFC<IDraggable> = ({
  parentCellId,
  contentId,
}) => {
  const ContentComponent = React.useCallback(
    contentId ? content[contentId] : () => null,
    [contentId]
  );

  return <ContentComponent parentCellId={parentCellId} contentId={contentId} />;
};
