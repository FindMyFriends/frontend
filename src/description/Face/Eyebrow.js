import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import Color from './../components/Color';

const Eyebrow = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Eyebrow</h3>
    <p><span>Care</span></p>
    <Slider
      style={{ width: 200 }}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['face.eyebrow.care']}
      onChange={onChange}
    />
    <Color
      name="face.eyebrow.color"
      values={values}
      onChange={onChange}
      colors={selects.eyebrowColors}
    />
    <br />
  </div>
);

Eyebrow.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Eyebrow;
