import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { requestedConfirm } from './../../ui/actions';
import { retract } from './../../demand/endpoints';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

export const items = (history, match, dispatch) => {
  const { params: { id } } = match;
  return {
    '/demands/:id': () => overview(id, history),
    '/demands/:id/soulmates': () => overview(id, history),
  };
};

const handleRetract = (dispatch, history, id) => {
  dispatch(requestedConfirm(
    'Are you sure, you want to retract demand?',
    () => dispatch(retract(id, history)),
  ));
};

const overview = (id, history, dispatch) => ([
  <MenuItem key={1} onClick={() => history.push(`/demands/${id}`)}>Overview</MenuItem>,
  <MenuItem key={2} onClick={() => history.push(`/demands/${id}/soulmates`)}>Soulmates</MenuItem>,
  <MenuItem
    rightIcon={<ArrowDropRight />}
    key={3}
    menuItems={[
      <MenuItem key={4} onClick={() => history.push(`/demands/${id}/edit`)}>Edit</MenuItem>,
      <MenuItem key={5} style={{ color: 'red' }} onClick={() => handleRetract(dispatch, history, id)}>
        Retract
      </MenuItem>,
  ]}
  >
    Settings
  </MenuItem>
]);
