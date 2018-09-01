// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import type { Credentials, CredentialsErrors } from '../../types';
import { withFormStyles } from '../../../description/input/parts/withFormStyles';
import { toMessage } from '../../../validation';

type Props = {|
  +classes: Object,
  +onChange: (string) => (void),
  +onSubmit: () => (void),
  +credentials: Credentials,
  +errors: CredentialsErrors,
|};
const Form = ({
  onChange,
  onSubmit,
  credentials,
  classes,
  errors,
}: Props) => (
  <React.Fragment>
    <FormControl error={!!errors.email} className={classes.formControl}>
      <InputLabel>Email</InputLabel>
      <Input
        onChange={onChange('email')}
        value={credentials.email}
      />
      {errors.email && <FormHelperText id="name-error-text">{toMessage(errors.email)}</FormHelperText>}
    </FormControl>
    <FormControl error={!!errors.password} className={classes.formControl}>
      <InputLabel>Password</InputLabel>
      <Input
        type="password"
        onChange={onChange('password')}
        value={credentials.password}
      />
      {errors.password && <FormHelperText id="name-error-text">{toMessage(errors.password)}</FormHelperText>}
    </FormControl>
    <Button variant="raised" onClick={onSubmit} color="primary">Sign in</Button>
  </React.Fragment>
);

export default withFormStyles()(Form);
