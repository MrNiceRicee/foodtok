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

export type { CellParams, Column, CellFunc };
