// @flow
import React from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import type { CredentialsType } from './CredentialsType';
import { withFormStyles } from '../../../description/input/parts/withFormStyles';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content:flex-start; 
  flex-direction: column;
  margin-top: 20px;
`;

type Props = {|
  +classes: Object,
  +onChange: (string) => (void),
  +onSubmit: () => (void),
  +credentials: CredentialsType,
|};
const Form = ({
  onChange,
  onSubmit,
  credentials,
  classes,
}: Props) => (
  <Center>
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
        onChange={onChange('password')}
        value={credentials.password}
      />
    </FormControl>
    <Button variant="raised" onClick={onSubmit} color="primary">Sign in</Button>
  </Center>
);

export default withFormStyles()(Form);
