import ReactDOM from "react-dom";
import React from "react";
import { Browser } from "./browser";
import { Synth } from "./synth";
import styled from "styled-components";
import { DragAndDropContext, DropZone } from "./table";
import { withDraggable } from "./table";

const AppLayout = styled.div`
  position: relative;
  display: flex;
  background-color: black;
  font-family: arial;
  font-size: 13px;
`;

const cellContentMap = {
  cell1: undefined,
  cell2: "component",
  cell3: undefined,
};
const content = {
  component: withDraggable(() => {
    return <div style={{ color: "white" }}>content</div>;
  }),
};

const App = () => {
  return (
    <AppLayout>
      <DragAndDropContext cellContentMap={cellContentMap} content={content}>
        {/* <Browser />
        <Synth /> */}
        <DropZone cellId={"cell1"} />
        <DropZone cellId={"cell2"} />
        <DropZone cellId={"cell3"} />
      </DragAndDropContext>
    </AppLayout>
  );
};

ReactDOM.render(<App />, document.getElementById("wave-app"));
