// @flow
import React from 'react';
import { connect } from 'react-redux';
import { unflatten } from 'flat';
import Form from '../../../sign/up/input/Form';
import { signUp } from '../../../sign/endpoints';
import Center from '../../../components/Center';
import type { RegistrationData, RegistrationDataErrors } from '../../../sign/types';
import { getBirthYear, getEthnicGroups, getSex } from '../../../seeker/selects';
import { options, schema, SEEKER } from '../../../seeker/endpoints';
import { getScopeOptions, getScopeSchema, isFetching } from '../../../schema/selects';
import Loader from '../../../ui/Loader';
import * as validation from '../../../sign/up/validation';

type Props = {|
  +signUp: (RegistrationData, () => (void)) => (void),
  +options: (void) => (void),
  +schema: (void) => (void),
  +selects: Object,
  +fetching: boolean,
  +history: Object,
|};
type State = {|
  registrationData: RegistrationData,
  errors: RegistrationDataErrors,
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
      contact: {
        facebook: null,
        instagram: null,
        phone_number: null,
      },
    },
    errors: {
      email: null,
      password: null,
      general: {
        firstname: null,
        lastname: null,
        ethnic_group_id: null,
        sex: null,
        birth_year: null,
      },
      contact: {
        facebook: null,
        instagram: null,
        phone_number: null,
      },
    },
  };

  componentDidMount = () => {
    this.props.options();
    this.props.schema();
  };

  handleChange = name => (event) => {
    event.persist();
    this.setState(prevState => ({
      registrationData: unflatten({
        ...prevState.registrationData,
        [name]: event.target.value,
      }),
      errors: unflatten({
        ...prevState.errors,
        [name]: null,
      }),
    }));
  };

  handleSubmit = () => {
    const { selects: { birthYear } } = this.props;
    if (validation.anyErrors(this.state.registrationData, birthYear)) {
      this.setState(prevState => ({
        ...prevState,
        errors: validation.errors(prevState.registrationData, birthYear),
      }));
    } else {
      this.props.signUp(
        this.state.registrationData,
        () => this.props.history.push('/sign/in'),
      );
    }
  };

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
          errors={this.state.errors}
        />
      </Center>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selects: {
      sex: getSex(getScopeOptions(state, SEEKER)),
      ethnicGroups: getEthnicGroups(getScopeOptions(state, SEEKER)),
      birthYear: getBirthYear(getScopeSchema(state, SEEKER)),
    },
    fetching: isFetching(state, SEEKER),
  };
};
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  schema: () => dispatch(schema()),
  signUp: (
    registrationData: RegistrationData,
    next: (Object) => (Promise<any>),
  ) => dispatch(signUp(registrationData, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Up);
