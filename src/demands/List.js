import React from 'react';
import PropTypes from 'prop-types';
import BoxInList from './BoxInList';

const List = ({ demands }) => {
  const loaded = demands => demands.length;

  if (!loaded(demands)) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      {demands.map(demand => <BoxInList key={demand.id} demand={demand} />)}
    </div>
  );
};

List.propTypes = {
  demands: PropTypes.array.isRequired,
};

export default List;
