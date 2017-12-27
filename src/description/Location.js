import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

const General = ({ selects, values, onChange }) => (
  <div>
    <h2>Location</h2>
    <TextField
      floatingLabelText="Coordinates"
      onChange={onChange}
      value={values['location.coordinates']}
      name="location.coordinates"
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Met at from"
      onChange={onChange}
      value={values['location.met_at.from']}
      name="location.met_at.from"
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Met at to"
      onChange={onChange}
      value={values['location.met_at.to']}
      name="location.met_at.to"
    />
  </div>
);

Location.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
