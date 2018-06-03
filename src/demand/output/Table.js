// @flow
import React from 'react';
import moment from 'moment';
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
  ];

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => {
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

type TableProps = {|
  +rows: Array<Object>,
  +sort: SortType,
  +pagination: PaginationType,
  +onSort: string => (void),
  +onPageChange: number => (void),
  +onPerPageChange: number => (void),
  +total: number,
|};
class Table extends React.Component<TableProps> {
  render() {
    const {
      rows,
      sort: { order, orderBy },
      pagination: { page, perPage },
      onSort,
      onPageChange,
      onPerPageChange,
      total,
    } = this.props;

    return (
      <Paper>
        <EnhancedTableToolbar />
        <MaterialTable style={{ overflowX: 'auto' }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onSort={onSort}
          />
          <TableBody>
            {rows.map((n, index) => {
              return (
                <TableRow hover key={n.id}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{n.general.firstname || '-'}</TableCell>
                  <TableCell>{n.general.lastame || '-'}</TableCell>
                  <TableCell>{n.general.sex}</TableCell>
                  <TableCell>{moment(n.created_at).format('YYYY-MM-DD')}</TableCell>
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
  }
}

export default Table;





/*
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class MaterialTable extends React.Component {
  handleRetract = (id: number) => {
    const { history, dispatch } = this.props;
    dispatch(requestedConfirm(
      'Are you sure, you want to retract demand?',
      () => dispatch(retract(id, () => history.push('/demands'))),
    ));
  };

  render() {
    const { demands, sorts, onSort } = this.props;
    if (demands.length === 0) {
      return (
        <Center>
          <h3>No demands, hit the button to add.</h3>
        </Center>
      );
    }
    return (
      <React.Fragment>
        <NoteDialog
          onSave={this.handleNoteTextSave}
          onTextChange={this.handleNoteTextChange}
          onClose={this.handleCloseNoteDialog}
          opened={this.state.note.dialog.opened}
        >
          {this.state.note.dialog.text}
        </NoteDialog>
        <MUITable selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>
                <SortColumn
                  name="id"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Position
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="general.firstname"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Firstname
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="general.lastname"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Lastname
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="general.sex"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Sex
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="general.age"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Age
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="created_at"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Created at
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>Note</TableHeaderColumn>
              <TableHeaderColumn>Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {demands.map((demand, index) => {
              return (
                <TableRow key={demand.id}>
                  <TableRowColumn>{index + 1}</TableRowColumn>
                  <TableRowColumn>{demand.general.firstname || '-'}</TableRowColumn>
                  <TableRowColumn>{demand.general.lastname || '-'}</TableRowColumn>
                  <TableRowColumn>{demand.general.sex}</TableRowColumn>
                  <TableRowColumn>{`${demand.general.age.from} - ${demand.general.age.to}`}</TableRowColumn>
                  <TableRowColumn>{moment(demand.created_at).format('MM/DD/YYYY HH:mm')}</TableRowColumn>
                  <TableRowColumn title={demand.note ? null : 'No available note'}>
                    <NoteIcon
                      onClick={() => this.handleOpenNoteDialog(demand.id)}
                      color={demand.note ? black : grey500}
                      style={{ cursor: 'pointer' }}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    >
                      <IconMenuItems
                        demand={demand}
                        onRetract={id => this.handleRetract(id)}
                      />
                    </IconMenu>
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
      </React.Fragment>
    );
  }
}

const IconMenuItems = ({ demand, onRetract }) => ([
  <MenuItem
    key={0}
    primaryText="View"
    leftIcon={<VisibilityIcon />}
    containerElement={<Link to={`/demands/${demand.id}`} />}
  />,
  <MenuItem
    key={1}
    primaryText="Reconsider"
    leftIcon={<EditIcon />}
    containerElement={<Link to={`/demands/${demand.id}/reconsider`} />}
  />,
  <MenuItem
    key={2}
    primaryText="Retract"
    leftIcon={<DeleteIcon color={red500} />}
    onClick={() => onRetract(demand.id)}
  />,
]);

MaterialTable.propTypes = {
  demands: PropTypes.array.isRequired,
  demandNotes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  sorts: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
};*/