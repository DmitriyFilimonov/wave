export interface IDraggable {
  parentCellId: string;
  contentId: string | undefined;
}

interface IContent {
  [key: string]: React.FC<IDraggable> | React.VFC<IDraggable> | undefined;
}

export interface IDropDragMap {
  [key: string]: string | undefined;
}

export interface IPlainDragAndDropContext {
  content: IContent;
  dropDragMap: IDropDragMap;
}

export interface IDragAndDropContextProps extends IPlainDragAndDropContext {}

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
