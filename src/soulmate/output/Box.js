import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

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

export const Box = ({ soulmates, requests, onRefresh }) => {
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
      <table>
        <tbody>
          <tr>
            <th>Evolution</th>
            <th>Is correct</th>
            <th>Is new</th>
            <th>Position</th>
            <th>Ownership</th>
          </tr>
          {soulmates.map((soulmate) => {
          return (
            <React.Fragment key={soulmate.id}>
              <td>{soulmate.evolution_id}</td>
              <td>{soulmate.is_correct ? 'Yes' : 'No'}</td>
              <td>{soulmate.is_new ? 'Yes' : 'No'}</td>
              <td>{soulmate.position}</td>
            </React.Fragment>
          );
        })}
        </tbody>
      </table>
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
