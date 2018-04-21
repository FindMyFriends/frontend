import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const yesNo = (value: mixed) => (value ? 'Yes' : 'No');

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RefreshButton = ({ requests, onRefresh }) => {
  const properties = {
    style: {
      position: 'relative',
      cursor: 'pointer',
      maxWidth: '50%',
    },
    size: 40,
    left: 0,
    top: 10,
  };
  const request = requests[0];
  if (request) {
    if (request.status === 'pending') {
      return (
        <Center>
          <RefreshIndicator {...properties} status="loading" />
        </Center>
      );
    } else if (request.is_refreshable) {
      return (
        <Center>
          <RefreshIndicator
              {...properties}
              onClick={onRefresh}
              percentage={100}
              status="ready"
            />
          </Center>
      );
    }
  }
  return null;
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

export const Box = ({
  soulmates, requests, onRefresh, onClarify, onSort, sorts,
}) => {
  if (soulmates.length === 1 && soulmates[0].id === null) {
    return (
      <div>
        <p>No matches</p>
        <RefreshButton requests={requests} onRefresh={onRefresh} />
      </div>
    );
  }
  return (
    <React.Fragment>
      <RefreshButton requests={requests} onRefresh={onRefresh} />
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
              <a href="#" onClick={() => onSort('position')}>
                <i className="material-icons">sort</i>
              </a>
                Position {orderArrow('position', sorts)}
            </TableHeaderColumn>
            <TableHeaderColumn>
              <a href="#" onClick={() => onSort('is_correct')}>
                <i className="material-icons">sort</i>
              </a>
              Is correct {orderArrow('is_correct', sorts)}
            </TableHeaderColumn>
            <TableHeaderColumn>
              <a href="#" onClick={() => onSort('new')}>
                <i className="material-icons">sort</i>
              </a>
              Is new {orderArrow('new', sorts)}
            </TableHeaderColumn>
            <TableHeaderColumn>
              <a href="#" onClick={() => onSort('ownership')}>
                <i className="material-icons">sort</i>
              </a>
              Ownership {orderArrow('ownership', sorts)}
            </TableHeaderColumn>
            <TableHeaderColumn>
              Evolution
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {soulmates.map((soulmate) => {
            return (
              <TableRow key={soulmate.id}>
                <TableRowColumn>{soulmate.position}</TableRowColumn>
                <TableRowColumn>
                  <Toggle
                    toggled={soulmate.is_correct}
                    onToggle={(event, checked) => onClarify(soulmate.id, { is_correct: checked })}
                  />
                </TableRowColumn>
                <TableRowColumn>{yesNo(soulmate.new)}</TableRowColumn>
                <TableRowColumn>{soulmate.ownership}</TableRowColumn>
                <TableRowColumn>
                  <span title="Visit">
                    <a href={`${soulmate.evolution_id}`}>
                      <i className="material-icons">visibility</i>
                    </a>
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

Box.propTypes = {
  soulmates: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onClarify: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sorts: PropTypes.object.isRequired,
};

RefreshButton.propTypes = {
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default Box;
