import styled from "styled-components";
import { IDropTargetLayoutProps } from "./types";

export const Draggable = styled.div`
  width: 50px;
  height: 30px;
  border: 1px solid red;
`;

export const DropTargetLayout = styled.div<IDropTargetLayoutProps>`
  border: ${({ border }) => border};
  width: 100px;
  height: 55px;

  & + & {
    margin-top: 5px;
  }
`;
