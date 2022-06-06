import { TableInstance } from '@tanstack/react-table';

const TableRow = () => {};

const Body = ({ instance }: { instance: TableInstance<any> }) => {
  return (
    <tbody>
      {instance.getRowModel().rows.map((row) => (
        <tr key={row.id}></tr>
      ))}
    </tbody>
  );
};

export default Body;
