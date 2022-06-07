import { TableInstance, Header } from '@tanstack/react-table';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ctl from '@netlify/classnames-template-literals';

const TableRow = ({ header }: { header: Header<any> }) => (
  <th
    colSpan={header.colSpan}
    style={{ width: header.getSize() }}
    className="relative group"
  >
    <button
      onClick={header.column.getToggleSortingHandler()}
      className="font-bold tracking-widest px-1"
    >
      {header.isPlaceholder ? null : header.renderHeader()}
      {{
        asc: <FontAwesomeIcon icon={faArrowDown} className="pl-2" />,
        desc: (
          <FontAwesomeIcon icon={faArrowDown} className="pr-2 rotate-180" />
        ),
      }[header.column.getIsSorted() as string] ?? (
        <FontAwesomeIcon icon={faArrowDown} className="pl-2 invisible" />
      )}
    </button>
    <div
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler}
      onTouchMoveCapture={header.getResizeHandler()}
      className={ctl(`
          absolute top-0 right-0
          h-full w-1
          cursor-col-resize
          group-hover:bg-pink-500
          group-active:bg-pink-500
          group-focus:bg-pink-500
          transition-all duration-200
          ${
            header.column.getIsResizing()
              ? 'w-2 bg-pink-500 select-none touch-none'
              : ''
          }
        `)}
    ></div>
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
