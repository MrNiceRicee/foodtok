import { CellFunc, Column } from './types';

type GenericObject = { [key: string]: any };

type AccessedValue = string | '-';

const accessValue = (
  obj: GenericObject | AccessedValue,
  stringPath: string
): string | '-' => {
  if (!stringPath) {
    return obj as AccessedValue;
  }
  try {
    stringPath.split('.').forEach((key) => {
      if (typeof obj === 'object') {
        obj = obj[key] ?? '-';
      }
    });
  } catch (err) {
    return '-';
  }
  return obj as AccessedValue;
};

const getAccessors = (columns: Column) => {
  return columns.reduce((prev, curr) => {
    prev.push(curr.accessor);
    return prev;
  }, [] as Array<string>);
};

const getHeaders = (columns: Column) => {
  return columns.reduce((prev, curr) => {
    prev.push(curr.header);
    return prev;
  }, [] as Array<string>);
};

const getDisplay = (row: object, value: string, cell?: CellFunc) => {
  if (cell) {
    return cell({ row, value });
  }
  // no cell, set to default
  return <span className="dark:text-slate-100 font-light">{value}</span>;
};

// const isDefined = (item: any) => {
//   if ([undefined, 'undefined', null, 'null'].includes(item)) {
//     return false;
//   }
//   return item;
// };

const getRows = (columns: Column, data: Array<any>) => {
  const accessors = getAccessors(columns);

  // loop data
  return data.reduce((prev, curr: object) => {
    // build columns
    prev.push(
      accessors.reduce((previous, current, idx) => {
        const column = columns[idx];
        const value = accessValue(curr, current);
        previous.push({
          value,
          row: curr,
          display: getDisplay(curr, value, column.cell),
          align: column.align,
        });
        return previous;
      }, [] as Array<{ value: string; row: object; display: JSX.Element; align?: 'left' | 'center' | 'right' }>)
    );
    return prev;
  }, []);
};

export const useTable = (columns: Column, data: any) => {
  return {
    headers: getHeaders(columns),
    rows: getRows(columns, data),
  };
};
