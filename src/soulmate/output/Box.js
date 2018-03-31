import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export const Box = ({ soulmates }) => {
  if (soulmates.length === 1 && soulmates[0].id === null) {
    return (
      <div>
        <p>No matches</p>
        <RaisedButton
          onClick={() => {}}
          label="Try it again"
          primary
        />
      </div>
    );
  }
  return (
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
  );
};

Box.propTypes = {
  soulmates: PropTypes.array.isRequired,
};

export default Box;
