import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ActionIcon } from '../../../../components/menu/Icon';

export const ActionItems = ({ id }) => (
  <React.Fragment>
    <Link to={`/demands/${id}`}>
      <ActionIcon className="material-icons" title="Demand">visibility</ActionIcon>
    </Link>
  </React.Fragment>
);

ActionItems.propTypes = {
  id: PropTypes.string.isRequired,
};
