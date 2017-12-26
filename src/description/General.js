import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

const General = ({ selects, values, onChange }) => (
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
      onChange={(event, index, value) => onChange({ target: { name: 'general.gender', value } })}
      value={values['general.gender']}
      name="general.gender"
    >
      {selects.genders.map(gender => <MenuItem key={gender} value={gender} primaryText={gender} />)}
    </SelectField>
    <br />
    <SelectField
      floatingLabelText="Race"
      onChange={(event, index, value) => onChange({ target: { name: 'general.race', value } })}
      value={values['general.race']}
      name="general.race"
    >
      {selects.races.map(race => <MenuItem key={race} value={race} primaryText={race} />)}
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
