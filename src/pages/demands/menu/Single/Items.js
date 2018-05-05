import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { requestedConfirm } from '../../../../ui/actions';
import { retract } from '../../../../demand/endpoints';
import { ActionIcon, DangerIcon } from '../../../../components/menu/Icon';

const handleRetract = (history, id) => (dispatch) => {
  dispatch(requestedConfirm(
    'Are you sure, you want to retract demand?',
    () => dispatch(retract(id, history)),
  ));
};

export const ActionItems = ({ history, id, dispatch }) => (
  <React.Fragment>
    <Link to={`/demands/${id}/edit`}>
      <ActionIcon className="material-icons">edit</ActionIcon>
    </Link>
    <DangerIcon className="material-icons" onClick={() => dispatch(handleRetract(history, id))}>delete</DangerIcon>
  </React.Fragment>
);

ActionItems.propTypes = {
  history: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
