import React from 'react';
import { Link } from 'react-router-dom';

const Default = () => {
  return (
    <React.Fragment>
        <Link to="/demands/add">Add demand</Link>
        <br />
        <Link to="/demands">Demands</Link>
    </React.Fragment>
  );
};

export default Default;
