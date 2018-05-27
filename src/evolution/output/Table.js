import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Table as MUITable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/image/edit';
import AddIcon from 'material-ui/svg-icons/content/add';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import { SortColumn } from '../../dataset/selection';

const Table = ({ evolutions, sorts, onSort }) => {
  return (
    <React.Fragment>
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
                name="evolved_at"
                sorts={sorts}
                onSort={onSort}
              >
                Evolved at
              </SortColumn>
            </TableHeaderColumn>
            <TableHeaderColumn>Action</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {evolutions.map((evolution, index) => {
            return (
              <TableRow key={evolution.id}>
                <TableRowColumn>{index + 1}</TableRowColumn>
                <TableRowColumn>{moment(evolution.evolved_at).format('MM/DD/YYYY HH:mm')}</TableRowColumn>
                <TableRowColumn>
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  >
                    <IconMenuItems evolution={evolution} />
                  </IconMenu>
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </MUITable>
    </React.Fragment>
  );
};

const IconMenuItems = ({ evolution }) => ([
  <MenuItem
    key={0}
    primaryText="View"
    leftIcon={<VisibilityIcon />}
    containerElement={<Link to={`/evolutions/${evolution.id}`} />}
  />,
  <MenuItem
    key={1}
    primaryText="Edit"
    leftIcon={<EditIcon />}
    containerElement={<Link to={`/evolutions/${evolution.id}/edit`} />}
  />,
  <MenuItem
    key={2}
    primaryText="Extend"
    leftIcon={<AddIcon />}
    containerElement={<Link to={`/evolutions/${evolution.id}/extend`} />}
  />,
]);

Table.propTypes = {
  evolutions: PropTypes.array.isRequired,
  sorts: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Table;
