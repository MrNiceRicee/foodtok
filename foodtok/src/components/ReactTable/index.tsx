import { TableInstance } from '@tanstack/react-table';
import Headers from './Header';

const ReactTable = ({ instance }: { instance: TableInstance<any> }) => {
  console.log('reacttable');
  return (
    <table className="container dark:text-slate-100">
      <Headers instance={instance} />
    </table>
  );
};

export default ReactTable;
