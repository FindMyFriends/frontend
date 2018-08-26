// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import type { Credentials } from '../../types';
import { withFormStyles } from '../../../description/input/parts/withFormStyles';

type Props = {|
  +classes: Object,
  +onChange: (string) => (void),
  +onSubmit: () => (void),
  +credentials: Credentials,
|};
const Form = ({
  onChange,
  onSubmit,
  credentials,
  classes,
}: Props) => (
  <React.Fragment>
    <FormControl className={classes.formControl}>
      <InputLabel>Email</InputLabel>
      <Input
        onChange={onChange('email')}
        value={credentials.email}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Password</InputLabel>
      <Input
        type="password"
        onChange={onChange('password')}
        value={credentials.password}
      />
    </FormControl>
    <Button variant="raised" onClick={onSubmit} color="primary">Sign in</Button>
  </React.Fragment>
);

export default withFormStyles()(Form);
