import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { requestedConfirm } from './../../ui/actions';
import { retract } from './../../demand/endpoints';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { TableActionIcon, DangerIcon } from './../../components/menu/Icon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

export const orderArrow = (sort, sorts) => {
  if (Object.prototype.hasOwnProperty.call(sorts, sort)) {
    return (
      sorts[sort][0] === '+'
        ? <i className="material-icons">arrow_drop_up</i>
        : <i className="material-icons">arrow_drop_down</i>
    );
  }
  return null;
};

const SortColumn = ({
  children, name, sorts, onSort,
}) => (
  <React.Fragment>
    <a href="#" onClick={() => onSort(name)}>
      <i className="material-icons">sort</i>
    </a>
    {children} {orderArrow(name, sorts)}
  </React.Fragment>
);

export const Box = ({ demands, dispatch, history, onSort, sorts }) => {
  if (demands.length === 0) {
    return (
      <React.Fragment>
        <Center>
          <h3>No demands</h3>
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
                <TableRowColumn>{++index}</TableRowColumn>
                <TableRowColumn>{demand.general.firstname}</TableRowColumn>
                <TableRowColumn>{demand.general.lastname}</TableRowColumn>
                <TableRowColumn>{demand.general.sex}</TableRowColumn>
                <TableRowColumn>{`${demand.general.age.from} - ${demand.general.age.to}`}</TableRowColumn>
                <TableRowColumn>{moment(demand.created_at).format('MM/DD/YYYY HH:mm')}</TableRowColumn>
                <TableRowColumn>
                  <Link to={`/demands/${demand.id}/soulmates`}>
                    {demand.soulmates.length}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  <span title="Visit">
                    <Link to={`/demands/${demand.id}`}>
                      <TableActionIcon className="material-icons">visibility</TableActionIcon>
                    </Link>
                  </span>
                  <span title="Delete" onClick={() => dispatch(handleRetract(history, demand.id))}>
                    <DangerIcon className="material-icons">delete</DangerIcon>
                  </span>
                </TableRowColumn>
              </TableRow>
            );
        })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Box;
