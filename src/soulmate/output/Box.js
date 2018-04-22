import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
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

const isSeeking = request => request && (request.status === 'pending' || request.status === 'processing');

export const RefreshButton = ({ requests, onRefresh }) => {
  const style = {
    position: 'relative',
  };
  const properties = {
    size: 40,
    left: 0,
    top: 10,
  };
  const request = requests[0];
  if (request) {
    if (isSeeking(request)) {
      return (
        <Center>
          <RefreshIndicator
            {...properties}
            style={{ ...style, cursor: 'progress' }}
            status="loading"
          />
        </Center>
      );
    } else if (request.is_refreshable) {
      return (
        <Center>
          <RefreshIndicator
            {...properties}
            style={{ ...style, cursor: 'pointer' }}
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

const NoMatchText = ({ requests }) => {
  if (requests) {
    const request = requests[0];
    if (isSeeking(request)) {
      return <h3>No matches, still searching..</h3>;
    }
    return <h3>No matches, hit button to refresh.</h3>;
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

export const Box = ({
  soulmates, requests, onRefresh, onClarify, onSort, sorts,
}) => {
  if (soulmates.length === 1 && soulmates[0].id === null) {
    return (
      <React.Fragment>
        <RefreshButton requests={requests} onRefresh={onRefresh} />
        <Center>
          <NoMatchText requests={requests} />
        </Center>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <RefreshButton requests={requests} onRefresh={onRefresh} />
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
              <SortColumn
                name="position"
                sorts={sorts}
                onSort={onSort}
              >
                Position
              </SortColumn>
            </TableHeaderColumn>
            <TableHeaderColumn>
              <SortColumn
                name="is_correct"
                sorts={sorts}
                onSort={onSort}
              >
                Is correct
              </SortColumn>
            </TableHeaderColumn>
            <TableHeaderColumn>
              <SortColumn
                name="new"
                sorts={sorts}
                onSort={onSort}
              >
                Is new
              </SortColumn>
            </TableHeaderColumn>
            <TableHeaderColumn>
              <SortColumn
                name="ownership"
                sorts={sorts}
                onSort={onSort}
              >
                Ownership
              </SortColumn>
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

NoMatchText.propTypes = {
  requests: PropTypes.array.isRequired,
};

RefreshButton.propTypes = {
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

SortColumn.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sorts: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Box;
