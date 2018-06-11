// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import range from 'lodash/range';
import styled from 'styled-components';
import { withFormStyles } from './withFormStyles';

const NextToEachOther = styled.div`
  flex-wrap: wrap;
`;

type AgeRangeProps = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +classes: Object,
|};
const AgeRange = ({ classes, values, onChange }: AgeRangeProps) => {
  const max = 85;
  const min = 15;
  const step = 5;
  const from = range(min, values['general.age.to'] || max, step);
  const to = range(
    values['general.age.from']
      ? values['general.age.from'] + step
      : min,
    max,
    step,
  );
  return (
    <NextToEachOther>
      <FormControl className={classes.formControl}>
        <InputLabel>From</InputLabel>
        <Select value={values['general.age.from'] || ''} onChange={onChange('general.age.from')}>
          {from.map(age => (
            <MenuItem key={age} value={age}>{age}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>To</InputLabel>
        <Select value={values['general.age.to'] || ''} onChange={onChange('general.age.to')}>
          {to.map(age => (
            <MenuItem key={age} value={age}>{age}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </NextToEachOther>
  );
};

export default withFormStyles()(AgeRange);
