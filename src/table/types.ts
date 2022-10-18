export interface IDraggable {
  parentDropTargetId: string;
  dragTargetId: string | undefined;
}

interface IContent {
  [key: string]: React.FC<IDraggable> | React.VFC<IDraggable>;
}

export interface IDropDragMap {
  [key: string]: string | undefined;
}

export interface IPlainDragAndDropContext {
  dragTargets: IContent;
  dropDragMap: IDropDragMap;
}

export interface IDragAndDropProps extends IPlainDragAndDropContext {}

interface IDragAndDropContextMethods {
  updateCellContextMap: (newCellContentMap: IDropDragMap) => void;
  subscribe: (listener: (param: IDropDragMap) => void) => void;
}

export interface IDragAndDropContextWithMethods
  extends IPlainDragAndDropContext,
    IDragAndDropContextMethods {}

export interface IDragTargetProps {
  dropTargetId: string;
}
export interface IDropTargetLayoutProps {
  border: string;
}
export type DropBaseCreatorParams = {
  dropTargetId: string;
  dropDragMap: IDropDragMap | undefined;
  updateCellContextMap: ((newCellContentMap: IDropDragMap) => void) | undefined;
};
