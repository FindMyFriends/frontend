// @flow
import React from 'react';
import { connect } from 'react-redux';
import Form from './../../../sign/in/input/Form';
import { enter } from '../../../sign/endpoints';
import type { CredentialsType } from '../../../sign/in/input/CredentialsType';

type Props = {|
  +enter: (CredentialsType, () => (void)) => (void)
|};
type State = {|
  credentials: CredentialsType,
|};
class In extends React.Component<Props, State> {
  state = {
    credentials: {
      email: 'me@fmf.com',
      password: 'heslo123',
    },
  };

  handleChange = name => event => (
    this.setState({
      credentials: {
        ...this.state.credentials,
        [name]: event.target.value,
      },
    })
  );

  handleSubmit = () => (
    this.props.enter(
      this.state.credentials,
      () => window.location.replace('/demands'),
    )
  );

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

const mapDispatchToProps = dispatch => ({
  enter: (
    credentials: CredentialsType,
    next: () => (void),
  ) => dispatch(enter(credentials.email, credentials.password, next)),
});
export default connect(null, mapDispatchToProps)(In);
