import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Detail from './../../demands/Detail';
import { single } from './../../demands/endpoints';

class Single extends React.Component {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(single(id));
  }

  render() {
    return (
      <div>
        <h1>Demand</h1>
        <Detail demand={this.props.demand} />
      </div>
    );
  }
}

Single.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  demand: PropTypes.object.isRequired,
};

export default connect(state => ({
  demand: state.demand.single || { },
}))(Single);
