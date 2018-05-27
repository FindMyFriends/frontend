import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import { red500, white } from 'material-ui/styles/colors';

export const ActionItems = ({ id }) => (
  <React.Fragment>
    <Link to={`/evolutions/${id}/change`}>
      <EditIcon style={{ padding: 10 }} color={white} />
    </Link>
    <DeleteIcon
      color={red500}
      style={{ padding: 10, cursor: 'pointer' }}
      onClick={() => {}}
    />
  </React.Fragment>
);

ActionItems.propTypes = {
  id: PropTypes.string.isRequired,
};
