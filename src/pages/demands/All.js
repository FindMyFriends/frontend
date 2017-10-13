import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import List from './../../demands/List';
import { all } from './../../demands/endpoints';
import Pagination from './../../components/Pagination';

class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        current: 1,
      }
    };
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  componentDidMount() {
    all()(this.props.dispatch);
  }

  onPaginationChange(event) {
    this.setState({
      pagination: {
        current: event,
      }
    });
  }

  render() {
    const { pagination: { current } } = this.state;
    return (
      <div>
      <PageHeader>All demands</PageHeader>
        {this.props.pages && <Pagination pages={this.props.pages} current={current} onChange={this.onPaginationChange} />}
        {this.props.demands && <List demands={this.props.demands} />}
      </div>
    );
  }
};

All.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(state => ({
  demands: state.demands.all || [],
  pages: state.demands.pages,
}))(All);
