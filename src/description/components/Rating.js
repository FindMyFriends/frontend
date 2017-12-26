import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';

const Rating = ({
  ratings, name, values, onChange,
}) => (
  <Slider
    style={{ width: 200 }}
    min={ratings.minimum}
    max={ratings.maximum}
    step={1}
    value={values[name]}
    onChange={onChange}
  />
);

Rating.propTypes = {
  onChange: PropTypes.func.isRequired,
  ratings: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default Rating;
