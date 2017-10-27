import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Box = ({ demand, more, onListing }) => {
  const lessFields = (demand) => {
    return [
      <li key="general.birth_year">Birth year: {demand.general.birth_year}</li>,
      <li key="general.gender">Gender: {demand.general.gender}</li>,
      <li key="general.race">Race: {demand.general.race}</li>,
    ];
  };

  const moreFields = (demand) => {
    return lessFields(demand).concat([
      <li key="general.firstname">Firstname: {demand.general.firstname}</li>,
      <li key="general.lastname">Lastname: {demand.general.lastname}</li>,
    ]);
  };

  return (
    <ul>
      {more ? moreFields(demand) : lessFields(demand)}
      <li>
        <Link to={`/demands/${demand.id}`}>Detail</Link>
      </li>
      <li>
        <button onClick={() => onListing(demand.id)}>{more ? 'Less' : 'More'}</button>
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
