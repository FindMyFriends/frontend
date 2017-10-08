import React from 'react';
import BoxInList from './BoxInList';

const List = ({ demands }) => {
  const loaded = demands => Object.keys(demands).length !== 0;

  if (!loaded(demands)) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      {demands.map(demand => <BoxInList key={demand.id} demand={demand} />)}
    </div>
  );
};

export default List;
