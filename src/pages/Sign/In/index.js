// @flow
import React from 'react';
import { connect } from 'react-redux';
import Form from './../../../sign/in/input/Form';
import { signIn } from '../../../sign/endpoints';
import Center from '../../../components/Center';
import type { Credentials } from '../../../sign/types';

type Props = {|
  +signIn: (Credentials, () => (void)) => (void)
|};
type State = {|
  credentials: Credentials,
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
    this.props.signIn(
      this.state.credentials,
      () => window.location.replace('/demands'),
    )
  );

  render() {
    return (
      <Center>
        <Form
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          credentials={this.state.credentials}
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
