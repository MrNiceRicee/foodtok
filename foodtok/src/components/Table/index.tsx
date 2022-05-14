import Body from './Body';
import Header from './Header';
import { useTable } from './util';

interface CellParams {
  row: any;
  value: any;
}
interface Props {
  column: Array<{
    header: string;
    accessor: string;
    // eslint-disable-next-line no-unused-vars
    cell?: ({ row, value }: CellParams) => any;
    align?: 'left' | 'center' | 'right';
  }>;
  data: any;
}
const Table = ({ column, data }: Props) => {
  if (!column) return <span className="dark:text-slate-100">No columns</span>;
  if (!data) return <span className="dark:text-slate-100">No Data</span>;

  if (Array.isArray(column)) {
    const { headers, rows } = useTable(column, data);
    return (
      <table>
        <Header headers={headers} />
        <Body rows={rows} />
      </table>
    );
  }

  return <span className="dark:text-slate-100">Incorrect Data Type</span>;
};

export default Table;
