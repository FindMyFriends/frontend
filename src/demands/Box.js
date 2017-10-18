import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Box = ({ demand, more, onListing }) => {
  const moreFields = demand => {
    return lessFields(demand).concat([
      <li key="general.firstname">Firstname: {demand.general.firstname}</li>,
      <li key="general.lastname">Lastname: {demand.general.lastname}</li>,
    ]);
  };

  const lessFields = demand => {
    return [
      <li key="general.age">Age: {demand.general.age}</li>,
      <li key="general.gender">Gender: {demand.general.gender}</li>,
      <li key="general.race">Race: {demand.general.race}</li>,
    ];
  };

  return (
    <ul>
      {more ? moreFields(demand) : lessFields(demand)}
      <li>
        <Link to={`/demands/${demand.id}`}>Detail</Link>
      </li>
      <li>
        <a onClick={() => onListing(demand.id)}>{more ? 'Less' : 'More'}</a>
      </li>
    </ul>
  );
};

Box.propTypes = {
  demand: PropTypes.object.isRequired,
  more: PropTypes.bool.isRequired,
  onListing: PropTypes.func.isRequired,
};

export default Box;
