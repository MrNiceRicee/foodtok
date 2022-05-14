type GenericObject = { [key: string]: any };

interface CellParams {
  row: any;
  value: any;
}
// eslint-disable-next-line no-unused-vars
type CellFunc = ({ row, value }: CellParams) => any;

type Column = Array<{
  header: string;
  accessor: string;
  cell?: CellFunc;
  align?: 'left' | 'center' | 'right';
}>;

interface Cell {
  display: JSX.Element;
  row: GenericObject;
  align?: 'left' | 'center' | 'right';
  value: string | number | '-';
}

export type { CellParams, Column, CellFunc, Cell };
