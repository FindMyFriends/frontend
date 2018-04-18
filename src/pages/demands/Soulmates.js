import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { all as allSoulmates, requests as soulmateRequests, refresh, clarify } from './../../soulmate/endpoints';
import { Box as SoulmateBox } from './../../soulmate/output/Box';

class Soulmates extends React.Component {
  state = {
    sorts: ['+position'],
  };
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(allSoulmates(id, { page: 1, perPage: 10 }, this.state.sorts));
    dispatch(soulmateRequests(id));
  }

  handleRefresh = this.handleRefresh.bind(this);

  handleRefresh() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(refresh(id));
  }

  handleClarify(soulmate, clarification) {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(clarify(soulmate, clarification, () => dispatch(allSoulmates(id, { page: 1, perPage: 10 }, this.state.sorts))));
  }

  handleSort(sorts) {
    const { dispatch, match: { params: { id } } } = this.props;
    this.setState({
      ...this.state,
      sorts,
    });
    dispatch(allSoulmates(id, { page: 1, perPage: 10 }, this.state.sorts));
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
        onClarify={(soulmate, clarification) => this.handleClarify(soulmate, clarification)}
        onSort={sorts => this.handleSort(sorts)}
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
