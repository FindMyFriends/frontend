// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MaskedInput from 'react-text-mask';

function TextMaskCustom(props: Object) {
  const { inputRef, ...rest } = props;
  return (
    <MaskedInput
      {...rest}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/, ' - ', /\d/, /\d/, /\d/]}
      showMask
    />
  );
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
    maxWidth: 300,
  },
});
type Props = {|
  +onChange: (property: string) => (void),
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
        value={values['general.firstname']}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Sex</InputLabel>
      <Select value={values['general.sex']} onChange={onChange('general.sex')}>
        {selects.sex.map(sex => (
          <MenuItem key={sex} value={sex}>{sex}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Ethnic group</InputLabel>
      <Select value={values['general.ethnic_group_id']} onChange={onChange('general.ethnic_group_id')}>
        {selects.ethnicGroups.map(ethnicGroup => (
          <MenuItem key={ethnicGroup.id} value={ethnicGroup.id}>
            {ethnicGroup.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <Input
        value={values['general.age']}
        onChange={onChange('general.age')}
        inputComponent={TextMaskCustom}
      />
    </FormControl>
  </React.Fragment>
);

export default withStyles(styles)(General);
