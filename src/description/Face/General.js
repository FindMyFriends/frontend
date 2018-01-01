import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import { onSelectChange, onCheck } from './../../forms/onChange';

const General = ({ selects: { ratings, shapes }, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>General</h3>
    <p>
      <span>Care</span>
    </p>
    <Slider
      style={{ width: 200 }}
      min={ratings.minimum}
      max={ratings.maximum}
      step={1}
      value={values['face.care']}
      onChange={onChange}
    />
    <Checkbox
      label="Freckles"
      name="face.freckles"
      onCheck={onCheck(onChange, values['face.freckles'])}
      checked={values['face.freckles']}
    />
    <SelectField
      floatingLabelText="Shape"
      onChange={onSelectChange(onChange, 'face.shape')}
      value={values['face.shape']}
      name="face.shape"
    >
      {shapes.map(shape => <MenuItem key={shape} value={shape} primaryText={shape} />)}
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
