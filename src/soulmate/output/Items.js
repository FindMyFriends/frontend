import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import styled from 'styled-components';

const StyledIcon = styled.i`
  cursor: pointer;
  color: white;
  padding: 10px;
`;

const InActionIcon = styled.i`
  cursor: not-allowed;
  color: #757575;
  padding: 10px;
`;

const isSeeking = request => request.status === 'pending' || request.status === 'processing';

export const RefreshButton = ({ requests, onRefresh }) => {
  const request = requests[0];
  if (R.isEmpty(request)) {
    return null;
  }
  if (isSeeking(request)) {
    return (
      <InActionIcon title="In progress" className="material-icons">refresh</InActionIcon>
    );
  } else if (request.is_refreshable) {
    return (
      <StyledIcon className="material-icons" onClick={onRefresh}>refresh</StyledIcon>
    );
  }
  return (
    <InActionIcon title="Not available" className="material-icons">refresh</InActionIcon>
  );
};

export const ActionItems = ({ requests, onRefresh }) => (
  <React.Fragment>
    <RefreshButton requests={requests} onRefresh={onRefresh} />
  </React.Fragment>
);


RefreshButton.propTypes = {
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

ActionItems.propTypes = {
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
