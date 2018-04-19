import React from 'react';
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

export const Box = ({ soulmates, requests, onRefresh, onClarify, onSort }) => {
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
                Position
            </TableHeaderColumn>
            <TableHeaderColumn>
              <a href="#" onClick={() => onSort('is_correct')}>
                <i className="material-icons">sort</i>
              </a>
              Is correct
            </TableHeaderColumn>
            <TableHeaderColumn>
              <a href="#" onClick={() => onSort('new')}>
                <i className="material-icons">sort</i>
              </a>
              Is new
            </TableHeaderColumn>
            <TableHeaderColumn>
              <a href="#" onClick={() => onSort('ownership')}>
                <i className="material-icons">sort</i>
              </a>
              Ownership
            </TableHeaderColumn>
            <TableHeaderColumn>
              Evolution
          </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {soulmates.map((soulmate, index) => {
            return (
              <TableRow key={index}>
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
                  <span title='Visit'>
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
};

RefreshButton.propTypes = {
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default Box;
