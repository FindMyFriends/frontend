import React from 'react';
import Slider from 'material-ui/Slider';

const Rating = ({ ratings, name, values, onChange }) => (
  <Slider
    style={{width: 200}}
    min={ratings.minimum}
    max={ratings.maximum}
    step={1}
    value={values[name]}
    onChange={onChange}
  />
);

export default Rating;
