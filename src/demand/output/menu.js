import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { requestedConfirm } from './../../ui/actions';
import { retract } from './../../demand/endpoints';

const handleRetract = (history, id) => (dispatch) => {
  dispatch(requestedConfirm(
    'Are you sure, you want to retract demand?',
    () => dispatch(retract(id, history)),
  ));
};

const handleClick = actions => actions.forEach(action => action());

const overview = (id, history, onClick) => dispatch => ([
  <MenuItem key={1} onClick={() => handleClick([() => history.push(`/demands/${id}`), onClick])}>Overview</MenuItem>,
  <MenuItem key={2} onClick={() => handleClick([() => history.push(`/demands/${id}/soulmates`), onClick])}>Soulmates</MenuItem>,
  <MenuItem
    rightIcon={<ArrowDropRight />}
    key={3}
    menuItems={[
      <MenuItem key={4} onClick={() => handleClick([() => history.push(`/demands/${id}/edit`), onClick])}>Edit</MenuItem>,
      <MenuItem key={5} style={{ color: 'red' }} onClick={() => dispatch(handleRetract(history, id))}>
        Retract
      </MenuItem>,
  ]}
  >
    Settings
  </MenuItem>,
]);

export const items = (history, match) => (dispatch) => {
  const { params: { id } } = match;
  return {
    '/demands/:id': onClick => dispatch(overview(id, history, onClick)),
    '/demands/:id/soulmates': onClick => dispatch(overview(id, history, onClick)),
  };
};
