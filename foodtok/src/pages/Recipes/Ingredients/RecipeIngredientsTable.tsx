import { useState } from 'react';
import { Ingredients as IngredientsType } from '@foodtok-types/recipe';
import {
  ColumnResizeMode,
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import ReactTable from '@components/ReactTable';

const table = createTable().setRowType<IngredientsType>();

const defaultColumns = [
  table.createDataColumn('name', {
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  table.createDataColumn('servingSize', {
    id: 'serving',
    cell: (info) => info.getValue() || '-',
    footer: (props) => props.column.id,
  }),
  table.createDataColumn('servingUnit', {
    id: 'unit',
    cell: (info) => info.getValue() || '-',
    footer: (props) => props.column.id,
  }),
];

const RecipeIngredientsTable = ({ data }: { data: IngredientsType[] }) => {
  const [columns] = useState<typeof defaultColumns>([...defaultColumns]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');

  // const rerender = useReducer(() => ({}), {})[1];

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode,
  });

  return <ReactTable instance={instance} />;
};

export default RecipeIngredientsTable;
