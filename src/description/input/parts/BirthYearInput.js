// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input/Input';
import { withFormStyles } from './withFormStyles';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +value: number,
  +classes: Object,
|};
const BirthYearInput = ({ classes, value, onChange }: Props) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Birth year</InputLabel>
      <Input type="number" inputProps={{ min: 1850, max: 2018 }} onChange={onChange} value={value || ''} />
    </FormControl>
  );
};

export default withFormStyles()(BirthYearInput);
