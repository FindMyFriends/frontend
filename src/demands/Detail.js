import React from 'react';
import PropTypes from 'prop-types';

const Detail = ({ demand }) => {
  if (!demand.id) {
    return <h1>Loading...</h1>;
  }
  return (
    <ul>
      <li>{demand.general.age}</li>
      <li>{demand.general.race}</li>
      <li>{demand.general.gender}</li>
      <li>{demand.general.firstname}</li>
      <li>{demand.general.lastname}</li>
    </ul>
  );
};

Detail.propTypes = {
  demand: PropTypes.shape({ general: { } }).isRequired,
};

export default Detail;
