// @flow
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

type SortColumn = {|
  +id: string,
  +sortable: boolean,
  +label: string,
|};
type Props = {|
  +columns: Array<SortColumn>,
  +onSort: (string) => (void),
  +order: string,
  +orderBy: string,
|};
const SortTableHead = ({
  order,
  orderBy,
  onSort,
  columns,
}: Props) => (
  <TableHead>
    <TableRow>
      {columns.map(column => (
        <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false}>
          {
            column.sortable
              ? (
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={() => onSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              )
              : column.label
          }
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default SortTableHead;
