import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import range from 'lodash/range';
import { combined } from './../../api/enum';
import { onSelectChange, onSelectEnumChange, onRangeChange } from './../../forms/events';

export const General = ({ selects: { ethnicGroups, sex }, values, onChange }) => (
  <div>
    <TextField
      floatingLabelText="Firstname"
      onChange={onChange}
      value={values['general.firstname']}
      name="general.firstname"
    />
    <SelectField
      floatingLabelText="Sex"
      onChange={onSelectChange(onChange, 'general.sex')}
      value={values['general.sex']}
      name="general.sex"
    >
      {sex.map(sex => <MenuItem key={sex} value={sex} primaryText={sex} />)}
    </SelectField>
    <SelectField
      floatingLabelText="Ethnic group"
      onChange={onSelectEnumChange(onChange, 'general.ethnic_group_id', ethnicGroups)}
      value={ethnicGroups[values['general.ethnic_group_id']]}
      name="general.ethnic_group_id"
    >
      {Object.values(ethnicGroups).map(ethnicity => (
        <MenuItem key={ethnicity} value={ethnicity} primaryText={ethnicity} />
      ))}
    </SelectField>
    <React.Fragment>
      <span>Age</span>
      <Range
        dots
        step={5}
        min={15}
        max={100}
        marks={combined(range(15, 105, 5), range(15, 105, 5))}
        onChange={onRangeChange(onChange, 'general.age', ['from', 'to'])}
        value={[values['general.age.from'], values['general.age.to']]}
      />
    </React.Fragment>
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
