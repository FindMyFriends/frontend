import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { onSelectChange } from './../../forms/events';

const LengthWithUnit = ({
  name, onChange, units, values,
}) => (
  <div>
    <TextField
      type="number"
      floatingLabelText="Length"
      onChange={onChange}
      name={`${name}.value`}
      value={values[`${name}.value`]}
    />
    <SelectField
      disabled={!values[`${name}.value`]}
      title={values[`${name}.value`] ? null : 'To change unit, type value'}
      floatingLabelText="Unit"
      onChange={onSelectChange(onChange, `${name}.unit`)}
      value={values[`${name}.unit`]}
      name={`${name}.unit`}
    >
      {units.map(unit => <MenuItem key={unit} value={unit} primaryText={unit} />)}
    </SelectField>
  </div>
);

LengthWithUnit.propTypes = {
  onChange: PropTypes.func.isRequired,
  units: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default LengthWithUnit;
