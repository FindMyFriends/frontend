import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { exit } from '../../sign/endpoints';

class Out extends React.Component {
  componentWillMount() {
    const { dispatch, history } = this.props;
    dispatch(exit(() => history.push('/sign/in')));
  }

  render() {
    return null;
  }
}

Out.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect()(Out);
