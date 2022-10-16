import ReactDOM from "react-dom";
import React from "react";
import styled from 'styled-components';

const Draggable = styled.div`
  width: 50px;
  height: 30px;
  border: 1px solid red;
`

const Slot = styled.div`
  width: 200px;
  height: 120px;
  border: 1px solid red;
`

let clientX: number = 0;
let clientY: number = 0;

const cellContentMap = {
  cell1: undefined,
  cell2: 'content',
  cell3: undefined,
}

interface IDraggable {
  parentCellId: string;
  contentId: string | undefined;
}

const withDraggable = (Content): React.VFC<IDraggable> => (props) => {
  const { parentCellId, contentId } = props;

  return (
    <Draggable
      draggable="true"
      onDragStart={e => {
        e.dataTransfer.setData("Text", JSON.stringify({ parentCellId, contentId }));
      }}
      onDrag={(e) => {
        if (e.clientX !== clientX || e.clientY !== clientY) {
          clientX = e.clientX;
          clientY = e.clientY;
        }
      }
      }
    >
      <Content />
    </Draggable>
  )
}

const ADSR = () => <>ADSR</>

const content = {
  content: withDraggable(ADSR)
};

const CellContent: React.VFC<IDraggable> = ({ parentCellId, contentId }) => {
  const ContentComponent = contentId ? content[contentId] : (() => null);

  return (
    <ContentComponent parentCellId={parentCellId} contentId={contentId} />
  )
}

const CellLayout = styled.div`
  border: 1px solid green;
  width: 100px;
  height: 55px;

  & + & {
    margin-top: 5px;
  }
`

const Cell = React.memo(({ cellId, contentId, setCellContentMapState, cellContentMapState }: any) => {

  return (
    <CellLayout
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={() => {}}
      onDragLeave={() => {}}
      onDrop={(e) => {
        const eventPayloadJSON = e.dataTransfer.getData("Text");

        const { contentId, parentCellId }: IDraggable = JSON.parse(eventPayloadJSON);

        const newContextValue = {
          ...cellContentMapState,
          [parentCellId]: undefined,
          [cellId]: contentId,
        };

        console.log(newContextValue);

        setCellContentMapState(newContextValue);
      }}
    >
      <CellContent contentId={contentId} parentCellId={cellId} />
    </CellLayout>
  )
})

const Table = () => {
  const [cellContentMapState, setCellContentMapState] = React.useState<{ [key: string]: string | undefined }>(cellContentMap)

  return (
    <>
      {
        Object.entries(cellContentMapState).map(([cellId, contentId]) => {
          return (
            <Cell
              key={cellId}
              cellId={cellId}
              contentId={contentId}
              cellContentMapState={cellContentMapState}
              setCellContentMapState={setCellContentMapState} />
          )
        })
      }
    </>
  )
}

const App = () => {
  return (
    <Table />
  );
}

ReactDOM.render(<App />, document.getElementById("wave-app"));