// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withFormStyles } from '../withFormStyles';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const General = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <FormControl className={classes.formControl}>
      <InputLabel>Care</InputLabel>
      <Select value={values['hands.care'] || ''} onChange={onChange('hands.care')}>
        {selects.ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Vein visibility</InputLabel>
      <Select value={values['hands.vein_visibility'] || ''} onChange={onChange('hands.vein_visibility')}>
        {selects.ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Joint visibility</InputLabel>
      <Select value={values['hands.joint_visibility'] || ''} onChange={onChange('hands.joint_visibility')}>
        {selects.ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
      </Select>
    </FormControl>
  </React.Fragment>
);

export default withFormStyles()(General);
