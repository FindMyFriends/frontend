// @flow
import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AgeRange from './AgeRange';
import { withFormStyles } from './withFormStyles';

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
      <InputLabel>Firstname</InputLabel>
      <Input
        onChange={onChange('general.firstname')}
        value={values['general.firstname'] || ''}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Lastname</InputLabel>
      <Input
        onChange={onChange('general.lastname')}
        value={values['general.lastname'] || ''}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Sex</InputLabel>
      <Select value={values['general.sex'] || ''} onChange={onChange('general.sex')}>
        {selects.sex.map(sex => (
          <MenuItem key={sex} value={sex}>{sex}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Ethnic group</InputLabel>
      <Select value={values['general.ethnic_group_id'] || ''} onChange={onChange('general.ethnic_group_id')}>
        {selects.ethnicGroups.map(ethnicGroup => (
          <MenuItem key={ethnicGroup.id} value={ethnicGroup.id}>
            {ethnicGroup.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <AgeRange
      classes={classes}
      values={values}
      onChange={onChange}
    />
  </React.Fragment>
);

export default withFormStyles()(General);
