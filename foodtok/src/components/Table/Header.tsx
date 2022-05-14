const TableRow = ({ data }: { data: string }) => (
  <th>
    <span className="dark:text-slate-100">{data}</span>
  </th>
);

const Header = ({ headers }: { headers: string[] }) => {
  return (
    <thead>
      <tr>
        {headers.map((item, idx) => (
          <TableRow data={item} key={`table_${item}_${idx}`} />
        ))}
      </tr>
    </thead>
  );
};
export default Header;
