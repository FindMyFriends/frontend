import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

const Rating = ({
  ratings, name, values, onChange,
}) => (
  <Slider
    style={{ width: 200 }}
    min={ratings.minimum}
    max={ratings.maximum}
    marks={{ 0: 'N/A', 1: 1, 10: 10 }}
    step={1}
    value={values[name]}
    onChange={value => onChange({ target: { name, value } })}
  />
);

Rating.propTypes = {
  onChange: PropTypes.func.isRequired,
  ratings: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default Rating;
