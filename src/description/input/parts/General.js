// @flow
import React from 'react';
import { omit, values } from 'lodash';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import AgeRangeInput from './AgeRangeInput';
import { withFormStyles } from './withFormStyles';
import ConditionalSexInput from './ConditionalSexInput';
import EthnicGroupInput from './EthnicGroupInput';

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
    <ConditionalSexInput
      key="sex"
      onChange={onChange}
      values={values}
      selects={selects}
      classes={classes}
    />
  ),
  ethnicGroup: (
    <EthnicGroupInput
      key="ethnicGroup"
      onChange={onChange('general.ethnic_group_id')}
      value={values['general.ethnic_group_id'] || ''}
      selects={selects.ethnicGroups}
      classes={classes}
    />
  ),
  age: (
    <AgeRangeInput
      key="age"
      classes={classes}
      values={values}
      onChange={onChange}
      age={selects.age}
    />
  ),
}, ignores));

export default withFormStyles()(General);
