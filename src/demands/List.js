import React from 'react';
import PropTypes from 'prop-types';
import BoxInList from './BoxInList';

const List = ({ demands }) => (
  <div>
    {demands.map(demand => <BoxInList key={demand.id} demand={demand} />)}
  </div>
);

List.propTypes = {
  demands: PropTypes.array.isRequired,
};

export default List;
