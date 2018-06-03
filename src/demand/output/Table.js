// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import NoteDialog from './NoteDialog';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';

type EnhancedTableHeadProps = {|
  +order: string,
  +orderBy: string,
  +onSort: (string) => (void),
|};
const EnhancedTableHead = ({ order, orderBy, onSort }: EnhancedTableHeadProps) => {
  const columns = [
    { id: 'id', sortable: false, label: '#' },
    { id: 'general.firstname', sortable: true, label: 'Firstname' },
    { id: 'general.lastname', sortable: true, label: 'Lastname' },
    { id: 'general.sex', sortable: true, label: 'Sex' },
    { id: 'created_at', sortable: true, label: 'Created at' },
    { id: 'note', sortable: false, label: 'Note' },
    { id: 'action', sortable: false, label: '' },
  ];

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => {
          return (
            <TableCell
              key={column.id}
              sortDirection={orderBy === column.id ? order : false}
            >
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
          );
        })}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = () => (
  <Toolbar>
    <Typography variant="title" id="tableTitle">
      Demands
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
  +rows: Array<Object>,
  +sort: SortType,
  +pagination: PaginationType,
  +onSort: string => (void),
  +onRetract: string => (void),
  +onPageChange: number => (void),
  +onPerPageChange: number => (void),
  +onNoteSave: (id: string, text: string, next: () => (Promise<any>)) => (void),
  +total: number,
  +classes: Object,
|};
const Table = ({
  onSort,
  onPageChange,
  onPerPageChange,
  onRetract,
  onNoteSave,
  rows,
  sort: { order, orderBy },
  pagination: { page, perPage },
  total,
  classes,
}: TableProps) => (
  <Paper>
    <EnhancedTableToolbar />
    <MaterialTable style={{ overflowX: 'auto' }} aria-labelledby="tableTitle">
      <EnhancedTableHead
        order={order}
        orderBy={orderBy}
        onSort={onSort}
      />
      <TableBody>
        {rows.map((demand, index) => {
          return (
            <TableRow hover key={demand.id}>
              <TableCell>{++index}</TableCell>
              <TableCell>{demand.general.firstname || '-'}</TableCell>
              <TableCell>{demand.general.lastame || '-'}</TableCell>
              <TableCell>{demand.general.sex}</TableCell>
              <TableCell>{moment(demand.created_at).format('YYYY-MM-DD')}</TableCell>
              <TableCell>
                <NoteDialog
                  note={demand.note}
                  onSave={(text: string, next: () => (Promise<any>)) => onNoteSave(demand.id, text, next)}
                />
              </TableCell>
              <TableCell numeric>
                <Link to={`/demands/${demand.id}`}>
                  <VisibilityIcon
                    color="action"
                    className={classes.iconHover}
                    style={{ margin: 5, cursor: 'pointer' }}
                    component={<Link to={`/demands/${demand.id}`} />}
                  />
                </Link>
                <Link to={`/demands/${demand.id}/reconsider`}>
                  <EditIcon
                    color="action"
                    className={classes.iconHover}
                    style={{ margin: 5, cursor: 'pointer' }}
                  />
                </Link>
                <DeleteIcon
                  className={classes.deleteIconHover}
                  style={{ margin: 5, cursor: 'pointer' }}
                  color="error"
                  onClick={() => onRetract(demand.id)}
                />
              </TableCell>
            </TableRow>
          );
        })}
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

export default withStyles(styles)(Table);
