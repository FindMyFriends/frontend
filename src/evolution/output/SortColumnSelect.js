// @flow
import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { mapValues, values } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
    maxWidth: 300,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: (ITEM_HEIGHT * 4.5) + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {|
  +classes: Object,
  +possibleColumns: Object,
  +onChange: () => (void),
  +columns: Array<string>,
|};
const SortColumnSelect = ({
  possibleColumns,
  onChange,
  columns,
  classes,
}: Props) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="select-multiple-checkbox">Columns to show</InputLabel>
    <Select
      multiple
      value={columns}
      onChange={onChange}
      input={<Input id="select-multiple-checkbox" />}
      renderValue={selected => selected.map(identifier => possibleColumns[identifier]).join(', ')}
      MenuProps={MenuProps}
    >
      {values(mapValues(possibleColumns, (name, identifier) => (
        <MenuItem key={identifier} value={identifier}>
          <Checkbox checked={columns.includes(identifier)} />
          <ListItemText primary={name} />
        </MenuItem>
      )))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(SortColumnSelect);
