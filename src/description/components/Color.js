import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { GithubPicker } from 'react-color';

const ID_COLORS = {
  8: {
    name: 'Black',
  },
  10: {
    name: 'Blue',
  }
};

const HEX_COLORS = {
  '#000000': {
    id: 8,
  },
  '#0000ff': {
    id: 10,
  },
};

const Color = ({
  colors, name, onChange, values,
}) => (
  <div>
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={ID_COLORS[values[name]].name}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name, value: HEX_COLORS[value].id } })}
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
