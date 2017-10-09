import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import Detail from './../../demands/Detail';
import { single } from './../../demands/endpoints';

class Single extends React.Component {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    single(id)(dispatch);
  }

  render() {
    return (
      <div>
        <PageHeader>Demand</PageHeader>
        <Detail demand={this.props.demand} />
      </div>
    );
  }
};

Single.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(state => state)(Single);
