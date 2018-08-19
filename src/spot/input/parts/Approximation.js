// @flow
import React from 'react';
import range from 'lodash/range';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withFormStyles } from '../../../description/input/parts/withFormStyles';

type Props = {|
  +position: number,
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +classes: Object,
|};
const Approximation = ({
  position,
  values,
  classes,
  onChange,
}: Props) => {
  if (values[`spots.${position}.met_at.timeline_side`] !== 'exactly') {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel>Approximation</InputLabel>
        <Select value={values[`spots.${position}.met_at.approximation`] || ''} onChange={onChange(`spots.${position}.met_at.approximation`)}>
          {range(1, 13).map(hour => <MenuItem key={hour} value={`PT${hour}H`}>{`${hour} hour${hour > 1 ? 's' : ''}`}</MenuItem>)}
        </Select>
      </FormControl>
    );
  }
  return null;
};

export default withFormStyles()(Approximation);
