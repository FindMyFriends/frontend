import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import Color from './../components/Color';

const Eye = ({
  selects, values, onChange, side,
}) => {
  const identifier = {
    color_id: `face.eye.${side}.color_id`,
    lenses: `face.eye.${side}.lenses`,
  };
  return (
    <div>
      <Color
        name={identifier.color_id}
        values={values}
        onChange={onChange}
        colors={selects.eyeColors}
      />
      <br />
      <Checkbox
        label="Lenses"
        name={identifier.lenses}
        checked={values[identifier.lenses]}
      />
      <br />
    </div>
  );
};

const Eyes = props => (
  <div>
    <h2>Eye</h2>
    <h3>Left</h3>
    <Eye side="left" {...props} />
    <h3>Right</h3>
    <Eye side="right" {...props} />
  </div>
);

Eye.propTypes = {
  onChange: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Eyes;
