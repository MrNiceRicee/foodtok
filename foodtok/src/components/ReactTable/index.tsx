import { TableInstance } from '@tanstack/react-table';
import Body from './Body';
import Headers from './Header';

const ReactTable = ({ instance }: { instance: TableInstance<any> }) => {
  return (
    <table className="container dark:text-slate-100">
      <Headers instance={instance} />
      <Body instance={instance} />
    </table>
  );
};

export default ReactTable;
