import { Cell } from './types';

const Row = ({ row }: { row: Array<Cell> }) => {
  return (
    <tr className="dark:hover:bg-neutral-900 hover:bg-slate-100">
      {row.map((cell, idx) => (
        <td className="prose dark:text-slate-100" key={idx}>
          <span>{cell.display || cell.value}</span>
        </td>
      ))}
    </tr>
  );
};

const Body = ({ rows }: { rows: Array<Array<Cell>> }) => {
  return (
    <tbody>
      {rows.map((row, idx) => (
        <Row row={row} key={idx} />
      ))}
    </tbody>
  );
};

export default Body;
