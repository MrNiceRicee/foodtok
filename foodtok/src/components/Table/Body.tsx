import { Column } from './types';

const Row = ({ row }: { row: Array<Column> }) => {
  return (
    <tr>
      {row.map((cell, idx) => (
        <td className="prose dark:text-slate-100" key={idx}>
          <>
            {console.log(cell)}
            <span>hello!!</span>
          </>
        </td>
      ))}
    </tr>
  );
};

const Body = ({ rows }: { rows: Array<Array<Column>> }) => {
  return (
    <tbody>
      {rows.map((row, idx) => (
        <Row row={row} key={idx} />
      ))}
    </tbody>
  );
};

export default Body;
