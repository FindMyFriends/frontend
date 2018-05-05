import React from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
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
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import { SortColumn } from '../../dataset/selection';

const yesNo = (value: mixed) => (value ? 'Yes' : 'No');

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const isSeeking = request => request && (request.status === 'pending' || request.status === 'processing');

const NoMatchText = ({ requests }) => {
  if (requests) {
    const request = requests[0];
    if (isSeeking(request)) {
      return <h3>No matches, still searching..</h3>;
    }
    return <h3>No matches, hit the button to refresh.</h3>;
  }
  return null;
};

export const Box = ({
  soulmates, requests, onClarify, onSort, sorts,
}) => {
  if (R.isEmpty(soulmates)) {
    return (
      <React.Fragment>
        <Center>
          <NoMatchText requests={requests} />
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
                      <VisibilityIcon />
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
  onClarify: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sorts: PropTypes.object.isRequired,
};

NoMatchText.propTypes = {
  requests: PropTypes.array.isRequired,
};
