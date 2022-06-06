import { useState } from 'react';
import { Ingredients as IngredientsType } from '@foodtok-types/recipe';
import {
  createTable,
  getCoreRowModel,
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
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
];

const RecipeIngredientsTable = ({ data }: { data: IngredientsType[] }) => {
  const [columns] = useState<typeof defaultColumns>([...defaultColumns]);

  // const rerender = useReducer(() => ({}), {})[1];

  console.log('react table start');
  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log('react table instance');

  return <ReactTable instance={instance} />;
  // return <div>Hey!</div>;
};

export default RecipeIngredientsTable;
