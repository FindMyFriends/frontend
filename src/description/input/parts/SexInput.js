// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const SexInput = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => {
  const handleChange = (event) => {
    onChange('general.sex')(event);
    if (event.target.value === 'man') {
      onChange('body.breast_size')({ target: { ...event.target, value: null } });
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Sex</InputLabel>
      <Select value={values['general.sex'] || ''} onChange={handleChange}>
        {selects.sex.map(sex => <MenuItem key={sex} value={sex}>{sex}</MenuItem>)}
      </Select>
    </FormControl>
  );
};

export default SexInput;
