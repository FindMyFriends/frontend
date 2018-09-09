// @flow
import React from 'react';
import { connect } from 'react-redux';
import Form from '../../../sign/in/input/Form';
import { signIn } from '../../../sign/endpoints';
import Center from '../../../components/Center';
import type { Credentials, CredentialsErrors } from '../../../sign/types';
import * as validation from '../../../sign/in/validation';

type Props = {|
  +signIn: (Credentials, () => (void)) => (void),
|};
type State = {|
  credentials: Credentials,
  errors: CredentialsErrors,
|};
class In extends React.Component<Props, State> {
  state = {
    credentials: {
      email: 'me@fmf.com',
      password: 'heslo123',
    },
    errors: {
      email: null,
      password: null,
    },
  };

  handleChange = name => event => (
    this.setState(prevState => ({
      credentials: {
        ...prevState.credentials,
        [name]: event.target.value,
      },
      errors: {
        ...prevState.errors,
        [name]: null,
      },
    }))
  );

  handleSubmit = () => {
    if (validation.anyErrors(this.state.credentials)) {
      this.setState(prevState => ({
        ...prevState,
        errors: validation.errors(prevState.credentials),
      }));
    } else {
      this.props.signIn(
        this.state.credentials,
        () => window.location.replace('/demands'),
      );
    }
  };

  render() {
    return (
      <Center>
        <Form
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          credentials={this.state.credentials}
          errors={this.state.errors}
        />
      </Center>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: (
    credentials: Credentials,
    next: () => (void),
  ) => dispatch(signIn(credentials, next)),
});
export default connect(null, mapDispatchToProps)(In);
