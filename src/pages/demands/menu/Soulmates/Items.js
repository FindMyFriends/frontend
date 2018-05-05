import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import { white, grey600 } from 'material-ui/styles/colors';

const isSeeking = request => request.status === 'pending' || request.status === 'processing';

export const RefreshButton = ({ requests, onRefresh }) => {
  const request = requests[0];
  if (R.isEmpty(request)) {
    return null;
  }
  if (isSeeking(request)) {
    return <RefreshIcon style={{ padding: 10 }} title="In progress" color={grey600} />;
  } else if (request.is_refreshable) {
    return <RefreshIcon style={{ padding: 10 }} color={white} onClick={onRefresh} />;
  }
  return <RefreshIcon style={{ padding: 10 }} title="Not available" color={grey600} />;
};

export const ActionItems = ({ requests, onRefresh }) => (
  <RefreshButton requests={requests} onRefresh={onRefresh} />
);


RefreshButton.propTypes = {
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

ActionItems.propTypes = {
  requests: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
