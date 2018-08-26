// @flow
import React from 'react';
import { connect } from 'react-redux';
import Form from './../../../sign/up/input/Form';
import { signUp } from '../../../sign/endpoints';
import Center from '../../../components/Center';
import type { RegistrationData } from '../../../sign/types';
import { getEthnicGroups, getSex } from '../../../description/selects';
import { getScopeOptions, isFetching } from '../../../schema/selects';
import { DESCRIPTION, schema } from '../../../description/endpoints';
import Loader from '../../../ui/Loader';

type Props = {|
  +signUp: (RegistrationData, () => (void)) => (void),
  +schema: (void) => (void),
  +selects: Object,
  +fetching: boolean,
|};
type State = {|
  registrationData: RegistrationData,
|};
class Up extends React.Component<Props, State> {
  state = {
    registrationData: {
      email: 'me@fmf.com',
      password: 'heslo123',
      general: {
        firstname: 'Dom',
        lastname: 'Klapuch',
        ethnic_group_id: 1,
        sex: 'man',
        age: { from: 22, to: 22 },
      },
    },
  };

  componentDidMount = () => {
    this.props.schema();
  };

  handleChange = name => event => (
    this.setState({
      registrationData: {
        ...this.state.registrationData,
        [name]: event.target.value,
      },
    })
  );

  handleSubmit = () => (
    this.props.signUp(
      this.state.registrationData,
      () => window.location.replace('/demands'),
    )
  );

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }
    console.log(this.props.selects);
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
  schema: () => dispatch(schema()),
  signUp: (
    registrationData: RegistrationData,
    next: () => (void),
  ) => dispatch(signUp(registrationData, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Up);
