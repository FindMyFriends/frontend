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
      <InputLabel>Amount</InputLabel>
      <Select value={values['hands.hair.amount'] || ''} onChange={onChange('hands.hair.amount')}>
        {selects.ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Color</InputLabel>
      <Select value={values['hands.hair.color_id'] || ''} onChange={onChange('hands.hair.color_id')}>
        {selects.handHairColors.map(color => (
          <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </React.Fragment>
);

export default withFormStyles()(General);
