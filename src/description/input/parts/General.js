// @flow
import React from 'react';
import { omit, values } from 'lodash';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AgeRangeInput from './AgeRangeInput';
import { withFormStyles } from './withFormStyles';
import SexInput from './SexInput';

const withoutIgnores = (
  components: Object,
  ignores: Array<string>,
) => values(omit(components, ignores));

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
  +ignores: Array<string>,
|};
const General = ({
  onChange,
  values,
  selects,
  classes,
  ignores,
}: Props) => (withoutIgnores({
  firstname: (
    <FormControl key="firstname" className={classes.formControl}>
      <InputLabel>Firstname</InputLabel>
      <Input
        onChange={onChange('general.firstname')}
        value={values['general.firstname'] || ''}
      />
    </FormControl>
  ),
  lastname: (
    <FormControl key="lastname" className={classes.formControl}>
      <InputLabel>Lastname</InputLabel>
      <Input
        onChange={onChange('general.lastname')}
        value={values['general.lastname'] || ''}
      />
    </FormControl>
  ),
  sex: (
    <SexInput
      key="sex"
      onChange={onChange}
      values={values}
      selects={selects}
      classes={classes}
    />
  ),
  ethnicGroup: (
    <FormControl key="ethnicGroup" className={classes.formControl}>
      <InputLabel>Ethnic group</InputLabel>
      <Select value={values['general.ethnic_group_id'] || ''} onChange={onChange('general.ethnic_group_id')}>
        {selects.ethnicGroups.map(ethnicGroup => (
          <MenuItem key={ethnicGroup.id} value={ethnicGroup.id}>
            {ethnicGroup.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
  age: (
    <AgeRangeInput
      key="age"
      classes={classes}
      values={values}
      onChange={onChange}
    />
  ),
}, ignores));

export default withFormStyles()(General);
