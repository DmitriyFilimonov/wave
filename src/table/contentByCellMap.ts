let _cellContentMap: { [key: string]: string | undefined } = {
  cell1: undefined,
  cell2: "content",
  cell3: undefined,
};

export const getCellContentMap = () => _cellContentMap;

export const updateCellContentMap = (
  newCellContentMap: typeof _cellContentMap
) => (_cellContentMap = newCellContentMap);
