import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { ActionIcon, InActionIcon } from '../../../../components/menu/Icon';

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
      <ActionIcon className="material-icons" onClick={onRefresh}>refresh</ActionIcon>
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
