import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import _ from 'lodash';
import { name as enumName, combined } from './../enum';
import { onSelectChange, onSelectEnumChange, onRangeChange } from './../forms/onChange';

const General = ({ selects: { races, genders }, values, onChange }) => (
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
      floatingLabelText="Race"
      onChange={onSelectEnumChange(onChange, 'general.race_id', races)}
      value={enumName(values['general.race_id'], races.id, races.name)}
      name="general.race_id"
    >
      {races.name.map(race => <MenuItem key={race} value={race} primaryText={race} />)}
    </SelectField>
    <br />
    <div style={{ width: 400 }}>
      <span>Age</span>
      <Range
        step={5}
        min={15}
        max={100}
        marks={combined(_.range(15, 105, 5), _.range(15, 105, 5))}
        onChange={onRangeChange(onChange, ['general.age.from', 'general.age.to'])}
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
