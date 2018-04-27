import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { requestedConfirm } from './../../ui/actions';
import { retract } from './../../demand/endpoints';

const handleRetract = (history, id) => (dispatch) => {
  dispatch(requestedConfirm(
    'Are you sure, you want to retract demand?',
    () => dispatch(retract(id, history)),
  ));
};

const StyledIcon = styled.i`
  cursor: pointer;
  color: white;
  padding: 10px;
`;

export const items = (history, id) => (dispatch) => (
  <React.Fragment>
    <StyledIcon className="material-icons" onClick={() => history.push(`/demands/${id}/edit`)}>edit</StyledIcon>
    <StyledIcon className="material-icons" style={{ color: '#F44336' }} onClick={() => dispatch(handleRetract(history, id))}>delete</StyledIcon>
  </React.Fragment>
);
