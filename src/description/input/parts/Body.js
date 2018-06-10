// @flow
import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { withFormStyles } from './withFormStyles';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};

const BreastSizeBySex = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => {
  if (values['general.sex'] === 'man') {
    return null;
  }
  return (
    <FormControl className={classes.formControl}>
      <FormLabel>Breast size</FormLabel>
      <RadioGroup
        aria-label="gender"
        value={values['body.breast_size']}
        onChange={onChange('body.breast_size')}
      >
        {selects.breastSizes.map(size => (
          <FormControlLabel key={size} value={size} control={<Radio />} label={size} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const Body = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <FormControl className={classes.formControl}>
      <InputLabel>Build</InputLabel>
      <Select value={values['body.build_id'] || ''} onChange={onChange('body.build_id')}>
        {selects.bodyBuilds.map(build => (
          <MenuItem key={build.id} value={build.id}>{build.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Weight</InputLabel>
      <Input
        type="number"
        onChange={onChange('body.weight.value')}
        value={values['body.weight.value'] || ''}
        startAdornment={<InputAdornment position="start">Kg</InputAdornment>}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Height</InputLabel>
      <Input
        type="number"
        onChange={onChange('body.height.value')}
        value={values['body.height.value'] || ''}
        startAdornment={<InputAdornment position="start">Cm</InputAdornment>}
      />
    </FormControl>
    <BreastSizeBySex
      onChange={onChange}
      values={values}
      selects={selects}
      classes={classes}
    />
  </React.Fragment>
);

export default withFormStyles()(Body);
