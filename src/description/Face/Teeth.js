import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import { onCheck } from './../../forms/events';

const Teeth = ({ selects: { ratings }, values, onChange }) => (
  <div>
    <h2>Teeth</h2>
    <p><span>Care</span></p>
    <Slider
      style={{ width: 200 }}
      min={ratings.minimum}
      max={ratings.maximum}
      step={1}
      value={values['face.teeth.care']}
      onChange={onChange}
    />
    <br />
    <Checkbox
      label="Braces"
      name="face.teeth.braces"
      onCheck={onCheck(onChange, 'face.teeth.braces')}
      checked={values['face.teeth.braces']}
    />
    <br />
  </div>
);

Teeth.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Teeth;
