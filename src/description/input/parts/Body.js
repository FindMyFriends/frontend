// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { withFormStyles } from './withFormStyles';
import MassInput from './MassInput';
import LengthInput from './LengthInput';

const styles = {
  radioGroup: {
    flexDirection: 'row',
  },
};

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
      <RadioGroup className={classes.radioGroup} value={values['body.breast_size']} onChange={onChange('body.breast_size')}>
        {selects.breastSizes.map(size => (
          <FormControlLabel key={size} value={size} control={<Radio color="primary" />} label={size} />
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
    <MassInput onChange={onChange('body.weight.value')} value={values['body.weight.value']}>
      Weight
    </MassInput>
    <LengthInput onChange={onChange('body.height.value')} value={values['body.height.value']}>
      Height
    </LengthInput>
    <BreastSizeBySex
      onChange={onChange}
      values={values}
      selects={selects}
      classes={classes}
    />
  </React.Fragment>
);

export default withFormStyles(styles)(Body);
