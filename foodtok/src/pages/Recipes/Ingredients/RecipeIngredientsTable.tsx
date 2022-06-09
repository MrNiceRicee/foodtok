import { useEffect, useMemo, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ingredients as IngredientsType } from '@foodtok-types/recipe';
import {
  ColumnDef,
  ColumnResizeMode,
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import ReactTable from '@components/ReactTable';
import ctl from '@netlify/classnames-template-literals';
import { updateRecipe } from '@apis/recipes';
import GrowIn from '@components/GrowIn';
import Button from '@components/Button';
import { useUserMatch } from '../state';

const table = createTable()
  .setRowType<IngredientsType>()
  .setTableMetaType<{
    updateData: (
      // eslint-disable-next-line no-unused-vars
      row: IngredientsType,
      // eslint-disable-next-line no-unused-vars
      columnId: 'servingUnit' | 'servingSize',
      // eslint-disable-next-line no-unused-vars
      value: unknown
    ) => Promise<void>;
  }>()
  .setColumnMetaType<{
    inputType?: React.HTMLInputTypeAttribute;
    locked?: boolean;
    UserMatch?: boolean;
  }>();

type MyTableGenerics = typeof table.generics;

const defaultColumn: Partial<ColumnDef<MyTableGenerics>> = {
  cell: ({
    getValue,
    row: { original },
    column: {
      id,
      columnDef: { meta },
    },
    instance,
  }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const [loading, setLoading] = useState(false);

    const onBlur = async () => {
      if (original) {
        setLoading(true);
        await instance.options.meta?.updateData(
          original,
          id as 'servingUnit' | 'servingSize',
          value
        );
        setLoading(false);
      }
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    if (!meta?.UserMatch) return <span>{value as string}</span>;

    return (
      <div className="relative">
        <input
          className={ctl(`
            w-full
            prose
            px-0 pb-0
            text-right
          focus-within:border-pink-500
            appearance-none focus:outline-none focus:ring-0
            bg-transparent outline-none border-t-0 border-r-0 border-l-0 border-b
            border-inherit
            text-slate-400 dark:text-slate-500
            active:text-slate-900 focus:text-slate-900
            dark:active:text-slate-200 dark:focus:text-slate-200
            duration-300
          `)}
          value={(value as string) || ''}
          placeholder="-"
          type={meta?.inputType || 'text'}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          disabled={loading}
        />
        {loading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            size="lg"
            className="absolute left-0 top-1/4 animate-spin min-w-[4rem] pointer-events-none cursor-none"
          />
        ) : null}
      </div>
    );
  },
};

const useDefaultColumns = ({ UserMatch }: { UserMatch: boolean }) =>
  useMemo(
    () => [
      table.createDataColumn('name', {
        cell: (info) => <span>{info.getValue()}</span>,
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('servingSize', {
        header: () => <span>size</span>,
        footer: (props) => props.column.id,
        meta: {
          inputType: 'number',
          UserMatch,
        },
      }),
      table.createDataColumn('servingUnit', {
        header: () => <span>unit</span>,
        footer: (props) => props.column.id,
        meta: {
          inputType: 'text',
          UserMatch,
        },
      }),
    ],
    [UserMatch]
  );

const RecipeIngredientsTable = ({
  data,
  RecipeId,
}: {
  data: IngredientsType[];
  RecipeId: string;
}) => {
  const [UserMatch] = useUserMatch();
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');
  const columns = useDefaultColumns({ UserMatch });

  const sendUpdate = updateRecipe(RecipeId, setError);

  const instance = useTableInstance(table, {
    data,
    columns,
    defaultColumn,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode,
    meta: {
      updateData: async (
        row: IngredientsType,
        columnId: 'servingSize' | 'servingUnit',
        value: unknown
      ) => {
        console.log('value', value);
        const updated = await sendUpdate.mutateAsync({
          Ingredients: [
            {
              IngredientId: row.IngredientId,
              name: row.name,
              [columnId]: value,
            },
          ],
        });
        console.log(updated);
      },
    },
  });

  const onDismissError = () => setError(null);

  return (
    <>
      <ReactTable instance={instance} />
      <GrowIn height="6rem" open={!!error}>
        <figure>
          <Button
            className={ctl(`
                rounded-none 
              bg-red-500 dark:bg-red-700
                outline-none border-none
                w-full break-words
              `)}
            type="button"
            onClick={onDismissError}
          >
            <p>{error}</p>
          </Button>
        </figure>
      </GrowIn>
    </>
  );
};

export default RecipeIngredientsTable;
