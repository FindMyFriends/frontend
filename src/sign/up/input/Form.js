// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withFormStyles } from '../../../description/input/parts/withFormStyles';
import type { RegistrationData } from '../../../seeker/types';
import SexInput from '../../../description/input/parts/SexInput';
import EthnicGroupInput from '../../../description/input/parts/EthnicGroupInput';
import BirthYearInput from '../../../description/input/parts/BirthYearInput';

type Props = {|
  +classes: Object,
  +onChange: (string) => (void),
  +onSubmit: () => (void),
  +selects: Object,
  +registrationData: RegistrationData,
|};
const Form = ({
  onChange,
  onSubmit,
  registrationData,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <Typography variant="title" color="inherit">Credentials</Typography>
    <FormControl className={classes.formControl}>
      <InputLabel>Email</InputLabel>
      <Input
        onChange={onChange('email')}
        value={registrationData.email}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Password</InputLabel>
      <Input
        type="password"
        onChange={onChange('password')}
        value={registrationData.password}
      />
    </FormControl>
    <Typography variant="title" color="inherit">General</Typography>
    <FormControl className={classes.formControl}>
      <InputLabel>Firstname</InputLabel>
      <Input
        onChange={onChange('general.firstname')}
        value={registrationData.general.firstname}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Lastname</InputLabel>
      <Input
        onChange={onChange('general.lastname')}
        value={registrationData.general.lastname}
      />
    </FormControl>
    <BirthYearInput
      onChange={onChange('general.birth_year')}
      value={registrationData.general.birth_year}
      classes={classes}
    />
    <SexInput
      onChange={onChange('general.sex')}
      value={registrationData.general.sex}
      selects={selects.sex}
      classes={classes}
    />
    <EthnicGroupInput
      onChange={onChange('general.ethnic_group_id')}
      value={registrationData.general.ethnic_group_id}
      selects={selects.ethnicGroups}
      classes={classes}
    />
    <Button variant="raised" onClick={onSubmit} color="primary">Sign up</Button>
  </React.Fragment>
);

export default withFormStyles()(Form);
