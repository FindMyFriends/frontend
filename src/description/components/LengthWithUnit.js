import React from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

const LengthWithUnit = ({ name, onChange, units, values }) => (
  <div>
    <TextField
      type="number"
      floatingLabelText="Length"
      onChange={onChange}
      name={`${name}.value`}
      value={values[`${name}.value`]}
    />
    <br />
    <SelectField
      floatingLabelText="Unit"
      onChange={(event, index, value) => onChange({ target: { name: `${name}.unit`, value} })}
      value={values[`${name}.unit`]}
      name={`${name}.unit`}
    >
    {units.map(unit => <MenuItem key={unit} value={unit} primaryText={unit} />)}
    </SelectField>
  </div>
);

export default LengthWithUnit;
