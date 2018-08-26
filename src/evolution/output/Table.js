// @flow
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import EnhancedTableToolbar from './EnhanedTableToolbar';
import SortTableHead from '../../dataset/SortTableHead';
import { dotsToValue, translation } from '../../dataset/columns';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import SortColumnSelect from './SortColumnSelect';

const MostRight = styled.span`
  float: right;
  padding-right: 10px;
`;

const columnsToHeaders = (columns: Array<string>): Array<Object> => {
  const header = id => ({
    id,
    sortable: true,
    label: translation(id),
  });
  return [
    ...columns.map(header),
    { id: 'evolved_at', sortable: true, label: 'Evolved at' },
    { id: 'action', sortable: false, label: '' },
  ];
};

const styles = () => ({
  deleteIconHover: {
    '&:hover': {
      color: red[800],
    },
  },
  iconHover: {
    '&:hover': {
      color: grey[700],
    },
  },
});
type Props = {|
  +columns: Array<string>,
  +possibleColumns: Object,
  +rows: Array<Object>,
  +sort: SortType,
  +pagination: PaginationType,
  +onSort: string => (void),
  +onPageChange: number => (void),
  +onPerPageChange: number => (void),
  +onRevert: string => (void),
  +onSortSelectionChange: () => (void),
  +total: number,
  +classes: Object,
|};
const Table = ({
  onSort,
  onPageChange,
  onPerPageChange,
  onRevert,
  rows,
  sort: { order, orderBy },
  pagination: { page, perPage },
  total,
  classes,
  columns,
  onSortSelectionChange,
  possibleColumns,
}: Props) => {
  return (
    <Paper>
      <EnhancedTableToolbar />
      {isEmpty(possibleColumns) ? null : (
        <MostRight>
          <SortColumnSelect
            possibleColumns={possibleColumns}
            onChange={onSortSelectionChange}
            columns={columns}
          />
        </MostRight>
      )}
      <MaterialTable style={{ overflowX: 'auto' }} aria-labelledby="tableTitle">
        <SortTableHead
          order={order}
          orderBy={orderBy}
          onSort={onSort}
          columns={columnsToHeaders(columns)}
        />
        <TableBody>
          {rows.map(evolution => (
            <TableRow hover key={evolution.id}>
              {columns.map(id => (
                <TableCell key={id}>
                  {dotsToValue(id, evolution)}
                </TableCell>
              ))}
              <TableCell>{moment(evolution.evolved_at).format('YYYY-MM-DD')}</TableCell>
              <TableCell numeric>
                <Link to={`/evolutions/${evolution.id}`}>
                  <VisibilityIcon
                    color="action"
                    className={classes.iconHover}
                    style={{ margin: 5, cursor: 'pointer' }}
                  />
                </Link>
                <Link to={`/evolutions/${evolution.id}/extend`}>
                  <AddIcon
                    color="action"
                    className={classes.iconHover}
                    style={{ margin: 5, cursor: 'pointer' }}
                  />
                </Link>
                <DeleteIcon
                  className={classes.deleteIconHover}
                  style={{ margin: 5, cursor: 'pointer' }}
                  color="error"
                  onClick={() => onRevert(evolution.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
      <TablePagination
        component="div"
        count={total}
        rowsPerPage={perPage}
        page={page - 1}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        onChangePage={(event, page) => onPageChange(page + 1)}
        onChangeRowsPerPage={event => onPerPageChange(event.target.value)}
      />
    </Paper>
  );
};

export default withStyles(styles)(Table);
