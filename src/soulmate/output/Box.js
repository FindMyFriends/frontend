import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const yesNo = (value: mixed) => (value ? 'Yes' : 'No');

export const RefreshButton = ({ requests, onRefresh }) => {
  if (requests.length === 1 && requests[0].is_refreshable) {
    return (
      <RaisedButton
        onClick={onRefresh}
        label="Try it again"
        primary
      />
    );
  }
  return null;
};

export const Box = ({ soulmates, requests, onRefresh, onClarify }) => {
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
            <TableHeaderColumn>Position</TableHeaderColumn>
            <TableHeaderColumn>Evolution</TableHeaderColumn>
            <TableHeaderColumn>Is correct</TableHeaderColumn>
            <TableHeaderColumn>Is new</TableHeaderColumn>
            <TableHeaderColumn>Ownership</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {soulmates.map((soulmate, index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn>{soulmate.position}</TableRowColumn>
                <TableRowColumn>{soulmate.evolution_id}</TableRowColumn>
                <TableRowColumn>
                  <Toggle
                    toggled={soulmate.is_correct}
                    onToggle={(event, checked) => onClarify(soulmate.id, { is_correct: checked })}
                  />
                </TableRowColumn>
                <TableRowColumn>{yesNo(soulmate.is_new)}</TableRowColumn>
                <TableRowColumn>{soulmate.ownership}</TableRowColumn>
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
};

RefreshButton.propTypes = {
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default Box;
