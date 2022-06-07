import { TableInstance } from '@tanstack/react-table';

const TableCell = ({ display }: { display: any }) => (
  <td className="px-1 prose dark:text-slate-400">{display}</td>
);

const Body = ({ instance }: { instance: TableInstance<any> }) => {
  return (
    <tbody>
      {instance.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="dark:hover:bg-neutral-900 hover:bg-slate-100"
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} display={cell.renderCell()} />
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Body;
