// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { mapValues, values } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import SortTableHead from '../../dataset/SortTableHead';
import { guessedFormatting, translatedField } from '../../description/selects';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';

const columnIdentificators = (columns: Object): Array<string> => (
  values(mapValues(columns, (count, id) => id))
);

const columnsToHeaders = (columns: Object): Array<Object> => {
  const header = id => ({
    id,
    sortable: true,
    label: translatedField(id),
  });
  return [
    ...columnIdentificators(columns).map(header),
    { id: 'evolved_at', sortable: true, label: 'Evolved at' },
    { id: 'action', sortable: false, label: '' },
  ];
};

const EnhancedTableToolbar = () => (
  <Toolbar>
    <Typography variant="title" id="tableTitle">
      Evolutions
    </Typography>
  </Toolbar>
);

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
type TableProps = {|
  +columns: Object,
  +rows: Array<Object>,
  +sort: SortType,
  +pagination: PaginationType,
  +onSort: string => (void),
  +onPageChange: number => (void),
  +onPerPageChange: number => (void),
  +total: number,
  +classes: Object,
|};
const Table = ({
  onSort,
  onPageChange,
  onPerPageChange,
  rows,
  sort: { order, orderBy },
  pagination: { page, perPage },
  total,
  classes,
  columns,
}: TableProps) => {
  return (
    <Paper>
      <EnhancedTableToolbar />
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
              {columnIdentificators(columns).map(id => (
                <TableCell key={id}>{guessedFormatting(id.split('.').reduce((object, key) => object[key], evolution))}</TableCell>
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
