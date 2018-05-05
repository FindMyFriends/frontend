import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Table,
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
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import { red500 } from 'material-ui/styles/colors';
import { requestedConfirm } from './../../ui/actions';
import { retract } from './../../demand/endpoints';
import { SortColumn } from '../../dataset/selection';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const handleRetract = (history, id) => (dispatch) => {
  dispatch(requestedConfirm(
    'Are you sure, you want to retract demand?',
    () => dispatch(retract(id, history)),
  ));
};

export const Box = ({
  demands, dispatch, history, onSort, sorts,
}) => {
  if (demands.length === 0) {
    return (
      <Center>
        <h3>No demands, hit the button to add.</h3>
      </Center>
    );
  }
  return (
    <React.Fragment>
      <Table selectable={false}>
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
            <TableHeaderColumn>Soulmates</TableHeaderColumn>
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
                <TableRowColumn>
                  <Link to={`/demands/${demand.id}/soulmates`}>
                    {demand.soulmates.length}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  >
                    <MenuItem
                      primaryText="View"
                      leftIcon={<VisibilityIcon />}
                      containerElement={<Link to={`/demands/${demand.id}`} />}
                    />
                    <MenuItem
                      primaryText="Reconsider"
                      leftIcon={<EditIcon />}
                      containerElement={<Link to={`/demands/${demand.id}/reconsider`} />}
                    />
                    <MenuItem
                      primaryText="Retract"
                      leftIcon={<DeleteIcon color={red500} />}
                      onClick={() => dispatch(handleRetract(history, demand.id))}
                    />
                  </IconMenu>
                </TableRowColumn>
              </TableRow>
            );
        })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

Box.propTypes = {
  demands: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  sorts: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Box;
