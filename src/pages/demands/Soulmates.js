import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Tabs from './menu/Tabs';
import { all as allSoulmates, requests as soulmateRequests, refresh, clarify } from './../../soulmate/endpoints';
import { Box as SoulmateBox } from './../../soulmate/output/Box';
import { twoSideSort } from './../../dataset/selection';

class Soulmates extends React.Component {
  state = {
    sorts: {
      position: '+position',
    },
  };

  componentDidMount() {
    const { dispatch, handleMenu, match: { params: { id } } } = this.props;
    dispatch(allSoulmates(id, { page: 1, perPage: 10 }, Object.values(this.state.sorts)));
    dispatch(soulmateRequests(id));
    handleMenu({
      filter: {
        title: 'Soulmates',
      },
    });
  }

  handleRefresh = this.handleRefresh.bind(this);

  handleRefresh() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(refresh(id));
  }

  handleClarify(soulmate, clarification) {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(clarify(
      soulmate,
      clarification,
      () => dispatch(allSoulmates(id, { page: 1, perPage: 10 }, Object.values(this.state.sorts))),
    ));
  }

  handleSort(sort) {
    const { dispatch, match: { params: { id } } } = this.props;
    this.setState({
      ...this.state,
      sorts: {
        ...twoSideSort(this.state.sorts, { [sort]: sort }),
      },
    }, () => dispatch(allSoulmates(id, { page: 1, perPage: 10 }, Object.values(this.state.sorts))));
  }

  render() {
    const { soulmates, requests } = this.props;
    if (R.isEmpty(soulmates)) {
      return <h1>Loading...</h1>;
    }
    return (
      <Tabs {...this.props}>
        <SoulmateBox
          soulmates={soulmates}
          requests={requests}
          onRefresh={() => this.handleRefresh()}
          onClarify={(soulmate, clarification) => this.handleClarify(soulmate, clarification)}
          onSort={sort => this.handleSort(sort)}
          sorts={this.state.sorts}
        />
      </Tabs>
    );
  }
}

Soulmates.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  soulmates: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired,
  handleMenu: PropTypes.func.isRequired,
};

export default connect(state => ({
  soulmates: state.soulmate.all || [],
  requests: state.soulmate.requests || [],
}))(Soulmates);
