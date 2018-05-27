import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from './../../evolution/output/Table';
import { all as allEvolutions } from './../../evolution/endpoints';
import { twoSideSort } from './../../dataset/selection';

class All extends React.Component {
  state = {
    boxes: {},
    sorts: {
      id: '+id',
    },
  };

  componentDidMount() {
    const { dispatch, handleMenu } = this.props;
    const { sorts } = this.state;
    dispatch(allEvolutions({ page: 1, perPage: 10 }, Object.values(sorts)));
    handleMenu({
      filter: {
        title: 'Evolutions',
      },
    });
  }

  handleSort = (sort) => {
    const { dispatch } = this.props;
    this.setState({
      ...this.state,
      sorts: {
        ...twoSideSort(this.state.sorts, { [sort]: sort }),
      },
    }, () => dispatch(allEvolutions({ page: 1, perPage: 10 }, Object.values(this.state.sorts))));
  };

  render() {
    const { sorts } = this.state;
    return (
      <Table
        {...this.props}
        sorts={sorts}
        onSort={this.handleSort}
      />
    );
  }
}

All.propTypes = {
  dispatch: PropTypes.func.isRequired,
  evolutions: PropTypes.array.isRequired,
  handleMenu: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(state => ({
  evolutions: state.evolution.all || [],
}))(All);
