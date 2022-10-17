import ReactDOM from "react-dom";
import React from "react";
import { Browser } from "./browser";
import { Synth } from "./synth";
import styled from "styled-components";

const AppLayout = styled.div`
  position: relative;
  display: flex;
  background-color: black;
  font-family: arial;
  font-size: 13px;
`;

const App = () => {
  return (
    <AppLayout>
      <Browser />
      <Synth />
    </AppLayout>
  );
};

ReactDOM.render(<App />, document.getElementById("wave-app"));
