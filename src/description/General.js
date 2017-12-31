import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { name as enumName } from './../enum';
import { onSelectChange, onSelectEnumChange } from './../forms/onChange';

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
    <TextField
      type="number"
      floatingLabelText="Age from"
      onChange={onChange}
      value={values['general.age.from']}
      name="general.age.from"
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Age to"
      onChange={onChange}
      value={values['general.age.to']}
      name="general.age.to"
    />
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
