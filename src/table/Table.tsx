import React from "react";
import { Cell } from "./Cell";
import { getCellContentMap } from "./contentByCellMap";

const useForceUpdate = () =>
  React.useReducer((x: number) => (x ? x - 1 : x + 1), 0)[1];

export const Table = () => {
  const rerenderTable = useForceUpdate();

  return (
    <>
      {Object.entries(getCellContentMap()).map(([cellId, contentId]) => {
        return (
          <Cell
            key={cellId}
            cellId={cellId}
            contentId={contentId}
            rerenderTable={rerenderTable}
          />
        );
      })}
    </>
  );
};
