import React from "react";
import { Shell } from "../Shell";

export const PitchShell = () => {
  return (
    <Shell>
      <input type={"checkbox"} id="onOff" />
      <input id="amount" />
    </Shell>
  );
};
