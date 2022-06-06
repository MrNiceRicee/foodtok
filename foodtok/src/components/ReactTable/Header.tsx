import { TableInstance, Header } from '@tanstack/react-table';

const TableRow = ({ header }: { header: Header<any> }) => (
  <th colSpan={header.colSpan}>
    {header.isPlaceholder ? null : header.renderHeader()}
  </th>
);

const Headers = ({ instance }: { instance: TableInstance<any> }) => {
  return (
    <thead>
      {instance.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableRow header={header} key={header.id} />
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Headers;
