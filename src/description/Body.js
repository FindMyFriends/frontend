import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { name as enumName } from './../enum';
import { onSelectEnumChange } from './../forms/onChange';

const Body = ({ selects: { bodyBuilds }, values, onChange }) => (
  <div>
    <h2>Body</h2>
    <SelectField
      floatingLabelText="Build"
      onChange={onSelectEnumChange(onChange, 'body.build_id', bodyBuilds)}
      value={enumName(values['body.build_id'], bodyBuilds.id, bodyBuilds.name)}
      name="body.build_id"
    >
      {bodyBuilds.name.map(build => <MenuItem key={build} value={build} primaryText={build} />)}
    </SelectField>
    <br />
    <TextField
      type="number"
      floatingLabelText="Weight"
      onChange={onChange}
      value={values['body.weight']}
      name="body.weight"
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Height"
      onChange={onChange}
      value={values['body.height']}
      name="body.height"
    />
  </div>
);

Body.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Body;
