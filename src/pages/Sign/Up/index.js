// @flow
import React from 'react';
import { connect } from 'react-redux';
import { unflatten } from 'flat';
import Form from './../../../sign/up/input/Form';
import { signUp } from '../../../sign/endpoints';
import Center from '../../../components/Center';
import type { RegistrationData } from '../../../seeker/types';
import { getEthnicGroups, getSex } from '../../../description/selects';
import { getScopeOptions, isFetching } from '../../../schema/selects';
import { DESCRIPTION, options } from '../../../description/endpoints';
import Loader from '../../../ui/Loader';

type Props = {|
  +signUp: (RegistrationData, () => (void)) => (void),
  +options: (void) => (void),
  +selects: Object,
  +fetching: boolean,
  +history: Object,
|};
type State = {|
  registrationData: RegistrationData,
|};
class Up extends React.Component<Props, State> {
  state = {
    registrationData: {
      email: null,
      password: null,
      general: {
        firstname: null,
        lastname: null,
        ethnic_group_id: null,
        sex: null,
        birth_year: null,
      },
    },
  };

  componentDidMount = () => {
    this.props.options();
  };

  handleChange = name => event => (
    this.setState({
      registrationData: unflatten({
        ...this.state.registrationData,
        [name]: event.target.value,
      }),
    })
  );

  handleSubmit = () => (
    this.props.signUp(
      this.state.registrationData,
      () => this.props.history.push('/sign/in'),
    )
  );

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }
    return (
      <Center>
        <Form
          selects={this.props.selects}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          registrationData={this.state.registrationData}
        />
      </Center>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selects: {
      sex: getSex(getScopeOptions(state, DESCRIPTION)),
      ethnicGroups: getEthnicGroups(getScopeOptions(state, DESCRIPTION)),
    },
    fetching: isFetching(state, DESCRIPTION),
  };
};
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  signUp: (
    registrationData: RegistrationData,
    next: () => (void),
  ) => dispatch(signUp(registrationData, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Up);
