// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withFormStyles } from './withFormStyles';
import IndeterminateCheckbox from './IndeterminateCheckbox';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const Teeth = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <FormControl className={classes.formControl}>
      <InputLabel>Care</InputLabel>
      <Select value={values['teeth.care'] || ''} onChange={onChange('teeth.care')}>
        {selects.ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
      </Select>
    </FormControl>
    <IndeterminateCheckbox
      checked={values['teeth.braces']}
      onChange={onChange('teeth.braces')}
      label="Braces"
    />
  </React.Fragment>
);

export default withFormStyles()(Teeth);
