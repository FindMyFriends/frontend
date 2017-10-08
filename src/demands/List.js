import React from 'react';

const List = ({ demands }) => {
  const loaded = demands => Object.keys(demands).length !== 0;

  if (!loaded(demands)) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      {demands.map(demand => <ul key={demand.id}><li>{demand.general.age}</li></ul>)}
    </div>
  );
};

export default List;
