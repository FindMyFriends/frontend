import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';

export const ActionItems = ({ id }) => (
  <Link to={`/evolutions/${id}`}>
    <VisibilityIcon />
  </Link>
);

ActionItems.propTypes = {
  id: PropTypes.string.isRequired,
};
