// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import range from 'lodash/range';
import styled from 'styled-components';
import { withFormStyles } from './withFormStyles';
import type { ApiRange } from '../../../api/enum';

const NextToEachOther = styled.div`
  flex-wrap: wrap;
`;

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +classes: Object,
  +age: ApiRange
|};
const AgeRangeInput = ({
  classes,
  values,
  onChange,
  age,
}: Props) => {
  const step = 5;
  const from = range(age.minimum, values['general.age.to'] || age.maximum, step);
  const to = range(
    values['general.age.from']
      ? values['general.age.from'] + step
      : age.minimum,
    age.maximum,
    step,
  );
  return (
    <NextToEachOther>
      <FormControl className={classes.formControl}>
        <InputLabel>From</InputLabel>
        <Select value={values['general.age.from'] || ''} onChange={onChange('general.age.from')}>
          {from.map(value => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>To</InputLabel>
        <Select value={values['general.age.to'] || ''} onChange={onChange('general.age.to')}>
          {to.map(value => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </NextToEachOther>
  );
};

export default withFormStyles()(AgeRangeInput);
