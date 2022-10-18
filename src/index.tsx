import ReactDOM from "react-dom";
import React from "react";
import { Browser } from "./browser";
import { Synth } from "./synth";
import styled from "styled-components";
import { DragAndDrop, DropTarget, withDraggable } from "./drag-and-drop";

const AppLayout = styled.div`
  position: relative;
  display: flex;
  background-color: black;
  font-family: arial;
  font-size: 13px;
`;

const dropDragMap = {
  cell1: undefined,
  cell2: "component",
  cell3: undefined,
};
const dragTargets = {
  component: withDraggable(() => {
    return <div style={{ color: "white" }}>content</div>;
  }),
};

const App = () => {
  return (
    <AppLayout>
      <DragAndDrop dropDragMap={dropDragMap} dragTargets={dragTargets}>
        <Browser />
        <Synth />
        <DropTarget dropTargetId={"cell1"} />
        <DropTarget dropTargetId={"cell2"} />
        <DropTarget dropTargetId={"cell3"} />
      </DragAndDrop>
    </AppLayout>
  );
};

ReactDOM.render(<App />, document.getElementById("wave-app"));
