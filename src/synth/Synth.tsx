import React from "react";
import {
  OscillatorShell,
  PitchShell,
  EnvelopeDisplay,
  ShellsList,
} from "./shells";
import { Controls, SynthBox, Title } from "./synth-box";

export const Synth = () => {
  return (
    <SynthBox>
      <Title />
      <Controls>
        <ShellsList>
          <OscillatorShell />
          <PitchShell />
        </ShellsList>
        <EnvelopeDisplay />
      </Controls>
    </SynthBox>
  );
};
