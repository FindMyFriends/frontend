import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import { red500, white } from 'material-ui/styles/colors';
import { requestedConfirm } from '../../../../ui/actions';
import { retract } from '../../../../demand/endpoints';

const handleRetract = (history, id) => (dispatch) => {
  dispatch(requestedConfirm(
    'Are you sure, you want to retract demand?',
    () => dispatch(retract(id, history)),
  ));
};

export const ActionItems = ({ history, id, dispatch }) => (
  <React.Fragment>
    <Link to={`/demands/${id}/reconsider`}>
      <EditIcon style={{ padding: 10 }} color={white} />
    </Link>
    <DeleteIcon
      color={red500}
      style={{ padding: 10, cursor: 'pointer' }}
      onClick={() => dispatch(handleRetract(history, id))}
    />
  </React.Fragment>
);

ActionItems.propTypes = {
  history: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
