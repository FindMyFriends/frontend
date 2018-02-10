import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import range from 'lodash/range';
import { combined } from './../enum';
import { onSelectChange, onSelectEnumChange, onRangeChange } from './../forms/events';

export const General = ({ selects: { ethnicGroups, genders }, values, onChange }) => (
  <div>
    <h2>General</h2>
    <TextField
      floatingLabelText="Firstname"
      onChange={onChange}
      value={values['general.firstname']}
      name="general.firstname"
    />
    <br />
    <SelectField
      floatingLabelText="Gender"
      onChange={onSelectChange(onChange, 'general.gender')}
      value={values['general.gender']}
      name="general.gender"
    >
      {genders.map(gender => <MenuItem key={gender} value={gender} primaryText={gender} />)}
    </SelectField>
    <br />
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
    <br />
    <div style={{ width: 400 }}>
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
    </div>
    <br />
    <br />
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
