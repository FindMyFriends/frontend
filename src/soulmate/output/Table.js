// @flow
import React from 'react';
import { Link } from 'react-router-dom';
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
import grey from '@material-ui/core/colors/grey';
import SortTableHead from '../../dataset/SortTableHead';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';

const columns = [
  { id: 'id', sortable: false, label: '#' },
  { id: 'is_correct', sortable: true, label: 'Correct' },
  { id: 'is_new', sortable: true, label: 'New' },
  { id: 'position', sortable: true, label: 'Position' },
  { id: 'action', sortable: false, label: '' },
];

const EnhancedTableToolbar = () => (
  <Toolbar>
    <Typography variant="title" id="tableTitle">
      Soulmates
    </Typography>
  </Toolbar>
);

const styles = () => ({
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
}: TableProps) => (
  <Paper>
    <EnhancedTableToolbar />
    <MaterialTable style={{ overflowX: 'auto' }} aria-labelledby="tableTitle">
      <SortTableHead
        order={order}
        orderBy={orderBy}
        onSort={onSort}
        columns={columns}
      />
      <TableBody>
        {rows.map((soulmate, index) => (
          <TableRow hover key={soulmate.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{soulmate.is_correct ? 'Y' : 'N'}</TableCell>
            <TableCell>{soulmate.is_new ? 'Y' : 'N'}</TableCell>
            <TableCell>{soulmate.position}</TableCell>
            <TableCell numeric>
              <Link to={`/demands/${soulmate.id}`}>
                <VisibilityIcon
                  color="action"
                  className={classes.iconHover}
                  style={{ margin: 5, cursor: 'pointer' }}
                  component={<Link to={`/demands/${soulmate.id}`} />}
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

export default withStyles(styles)(Table);
