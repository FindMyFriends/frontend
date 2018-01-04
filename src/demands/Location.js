import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { onSelectChange } from './../forms/events';

const Location = ({ values, selects: { timelineSides }, onChange }) => (
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
      floatingLabelText="Moment"
      onChange={onChange}
      value={values['location.met_at.moment']}
      name="location.met_at.moment"
    />
    <br />
    <SelectField
      floatingLabelText="Timeline side"
      onChange={onSelectChange(onChange, 'location.met_at.timeline_side')}
      value={values['location.met_at.timeline_side']}
      name="location.met_at.timeline_side"
    >
      {timelineSides.map(timelineSide => <MenuItem key={timelineSide} value={timelineSide} primaryText={timelineSide} />)}
    </SelectField>
  </div>
);

Location.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Location;
