import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from './../../sign/in/input/Form';
import { enter } from '../../sign/endpoints';

class In extends React.Component {
  state = {
    credentials: {
      email: 'me@fmf.com',
      password: 'heslo123',
    },
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { credentials: { email, password } } = this.state;
    dispatch(enter(email, password, history));
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        credentials={this.state.credentials}
      />
    );
  }
}

In.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect()(In);
