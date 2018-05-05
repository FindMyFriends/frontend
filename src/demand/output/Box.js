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
import { requestedConfirm } from './../../ui/actions';
import { TableActionIcon, DangerIcon } from './../../components/menu/Icon';
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
      <React.Fragment>
        <Center>
          <h3>No demands, hit the button to add.</h3>
        </Center>
      </React.Fragment>
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
                  <Link to={`/demands/${demand.id}`}>
                    <TableActionIcon title="Visit" className="material-icons">visibility</TableActionIcon>
                  </Link>
                  <DangerIcon title="Delete" className="material-icons" onClick={() => dispatch(handleRetract(history, demand.id))}>delete</DangerIcon>
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
