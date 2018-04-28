import React from 'react';
import PropTypes from 'prop-types';
import { requestedConfirm } from './../../ui/actions';
import { retract } from './../../demand/endpoints';
import { ActionIcon } from './../../components/menu/Icon';

const handleRetract = (history, id) => (dispatch) => {
  dispatch(requestedConfirm(
    'Are you sure, you want to retract demand?',
    () => dispatch(retract(id, history)),
  ));
};

export const ActionItems = ({ history, id, dispatch }) => (
  <React.Fragment>
    <ActionIcon className="material-icons" onClick={() => history.push(`/demands/${id}/edit`)}>edit</ActionIcon>
    <ActionIcon className="material-icons" style={{ color: '#F44336' }} onClick={() => dispatch(handleRetract(history, id))}>delete</ActionIcon>
  </React.Fragment>
);

ActionItems.propTypes = {
  history: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
