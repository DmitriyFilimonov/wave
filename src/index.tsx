import ReactDOM from "react-dom";
import React from "react";
import styled from "styled-components";

const Draggable = styled.div`
  width: 50px;
  height: 30px;
  border: 1px solid red;
`;

const Slot = styled.div`
  width: 200px;
  height: 120px;
  border: 1px solid red;
`;

let clientX = 0;
let clientY = 0;

const cellContentMap = {
  cell1: undefined,
  cell2: "content",
  cell3: undefined,
};

interface IDraggable {
  parentCellId: string;
  contentId: string | undefined;
}

const withDraggable =
  (Content): React.VFC<IDraggable> =>
  (props) => {
    const { parentCellId, contentId } = props;

    return (
      <Draggable
        draggable="true"
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "Text",
            JSON.stringify({ parentCellId, contentId })
          );
        }}
        onDrag={(e) => {
          if (e.clientX !== clientX || e.clientY !== clientY) {
            clientX = e.clientX;
            clientY = e.clientY;
          }
        }}
      >
        <Content />
      </Draggable>
    );
  };

const ADSR: React.VFC = () => <>ADSR</>;

const content = {
  content: withDraggable(ADSR),
};

const CellContent: React.VFC<IDraggable> = ({ parentCellId, contentId }) => {
  const ContentComponent = React.useCallback(
    contentId ? content[contentId] : () => null,
    [contentId]
  );

  return <ContentComponent parentCellId={parentCellId} contentId={contentId} />;
};

const CellLayout = styled.div`
  border: 1px solid green;
  width: 100px;
  height: 55px;

  & + & {
    margin-top: 5px;
  }
`;

const Cell = React.memo(
  ({
    cellId: dropTargetId,
    contentId,
    setCellContentMapState,
    cellContentMapState,
  }: any) => {
    console.log({ [dropTargetId]: "rerender" });

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

          const newContextValue = {
            ...cellContentMapState,
            [dragTargetParentCellId]: undefined,
            [dropTargetId]: dragTargetId,
          };

          setCellContentMapState(newContextValue);
        }}
      >
        <CellContent contentId={contentId} parentCellId={dropTargetId} />
      </CellLayout>
    );
  }
);

const Table = () => {
  const [cellContentMapState, setCellContentMapState] = React.useState<{
    [key: string]: string | undefined;
  }>(cellContentMap);

  return (
    <>
      {Object.entries(cellContentMapState).map(([cellId, contentId]) => {
        return (
          <Cell
            key={cellId}
            cellId={cellId}
            contentId={contentId}
            cellContentMapState={cellContentMapState}
            setCellContentMapState={setCellContentMapState}
          />
        );
      })}
    </>
  )
}

const App = () => {
  return (
    <Table />
  );
};

ReactDOM.render(<App />, document.getElementById("wave-app"));
