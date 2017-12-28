import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const Location = ({ values, onChange }) => (
  <div>
    <h2>Location</h2>
    <TextField
      floatingLabelText="Latitude"
      onChange={onChange}
      value={values['location.coordinates.latitude']}
      name="location.coordinates.latitude"
    />
    <TextField
      floatingLabelText="Longitude"
      onChange={onChange}
      value={values['location.coordinates.longitude']}
      name="location.coordinates.longitude"
    />
    <br />
    <TextField
      floatingLabelText="Met at from"
      onChange={onChange}
      value={values['location.met_at.from']}
      name="location.met_at.from"
    />
    <TextField
      floatingLabelText="Met at to"
      onChange={onChange}
      value={values['location.met_at.to']}
      name="location.met_at.to"
    />
  </div>
);

Location.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default Location;
