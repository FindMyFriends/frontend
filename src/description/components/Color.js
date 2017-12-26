import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { GithubPicker } from 'react-color';

const Color = ({
  colors, name, onChange, values,
}) => (
  <div>
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={colors.name[colors.hex.indexOf(values[name])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name, value } })}
      colors={colors.hex}
    />
  </div>
);

Color.propTypes = {
  onChange: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default Color;
