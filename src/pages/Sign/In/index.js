// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from '../../../sign/in/input/Form';
import { signIn } from '../../../sign/endpoints';
import Center from '../../../components/Center';
import type { Credentials, CredentialsErrors } from '../../../sign/types';
import * as validation from '../../../sign/in/validation';

type Props = {|
  +signIn: (Credentials, () => (void)) => (void),
  +location: Object,
|};
type State = {|
  credentials: Credentials,
  errors: CredentialsErrors,
  redirectToReferrer: boolean,
|};
class In extends React.Component<Props, State> {
  state = {
    redirectToReferrer: false,
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
        () => this.setState(prevState => ({ ...prevState, redirectToReferrer: true })),
      );
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/demands' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

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
