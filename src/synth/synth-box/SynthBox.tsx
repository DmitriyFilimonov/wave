import React from "react";
import { SynthBoxLayout } from "./styled";
import { Title } from "./Title";

const title = "title";

export const SynthBox = ({ children: SynthStuff }) => {
  return <SynthBoxLayout>{SynthStuff}</SynthBoxLayout>;
};
