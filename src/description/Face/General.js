import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

const General = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>General</h3>
    <p>
      <span>Care</span>
    </p>
    <Slider
      style={{ width: 200 }}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['face.care']}
      onChange={onChange}
    />
    <SelectField
      floatingLabelText="Shape"
      onChange={(event, index, value) => onChange({ target: { name: 'face.shape', value } })}
      value={values['face.shape']}
      name="face.shape"
    >
      {selects.shapes.map(shape => <MenuItem key={shape} value={shape} primaryText={shape} />)}
    </SelectField>
    <br />
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
