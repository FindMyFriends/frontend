// @flow
import React from 'react';
import moment from 'moment';
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
import grey from '@material-ui/core/colors/grey';
import { default as EvolutionIcon } from '../../evolution/output/Icon';
import SortTableHead from '../../dataset/SortTableHead';
import YesNo from './YesNo';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';

const columns = [
  { id: 'position', sortable: true, label: '#' },
  { id: 'related_at', sortable: true, label: 'Related at' },
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
  +onMarkAs: (id: string, as: boolean) => (void),
  +total: number,
  +classes: Object,
|};
const Table = ({
  onSort,
  onPageChange,
  onPerPageChange,
  onMarkAs,
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
        {rows.map(soulmate => (
          <TableRow selected={soulmate.is_new} hover key={soulmate.id}>
            <TableCell>{soulmate.position}</TableCell>
            <TableCell>{moment(soulmate.related_at).format('YYYY-MM-DD')}</TableCell>
            <TableCell numeric>
              <Link to={`/demands/${soulmate.id}`}>
                <EvolutionIcon
                  color="action"
                  className={classes.iconHover}
                  style={{ margin: 5, cursor: 'pointer' }}
                />
              </Link>
              <YesNo
                color="action"
                className={classes.iconHover}
                style={{ margin: 5, cursor: 'pointer' }}
                onClick={() => onMarkAs(soulmate.id, !soulmate.is_correct)}
              >
                {soulmate.is_correct}
              </YesNo>
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
