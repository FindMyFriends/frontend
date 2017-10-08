import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import List from './../../demands/List';
import { all } from './../../demands/endpoints';

class All extends React.Component {
  componentDidMount() {
    all()(this.props.dispatch);
  }

  render() {
    return (
      <div>
        <PageHeader>All demands</PageHeader>
        <List demands={this.props.demands} />
      </div>
    );
  }
};

All.propTypes = {
  dispatch: PropTypes.func
};

export default connect(state => state)(All);
