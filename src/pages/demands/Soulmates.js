import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { all as allSoulmates, requests as soulmateRequests, refresh } from './../../soulmate/endpoints';
import { Box as SoulmateBox } from './../../soulmate/output/Box';

class Soulmates extends React.Component {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(allSoulmates(id, { page: 1, perPage: 10 }));
    dispatch(soulmateRequests(id));
  }

  handleRefresh = this.handleRefresh.bind(this);

  handleRefresh() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(refresh(id));
  }

  render() {
    const { soulmates, requests } = this.props;
    if (R.isEmpty(soulmates)) {
      return <h1>Loading...</h1>;
    }
    return (
      <SoulmateBox
        soulmates={soulmates}
        requests={requests}
        onRefresh={() => this.handleRefresh()}
      />
    );
  }
}

Soulmates.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  soulmates: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired,
};

export default connect(state => ({
  soulmates: state.soulmate.all || [],
  requests: state.soulmate.requests || [],
}))(Soulmates);
