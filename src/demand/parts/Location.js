import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import ApproximateDatetime from './../input/ApproximateDatetime';

const Location = ({ values, selects, onChange }) => {
  return (
    <div>
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
      <ApproximateDatetime
        values={values}
        selects={selects}
        onChange={onChange}
      />
    </div>
  );
};

Location.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Location;
