import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const ID_COLORS = {
  8: {
    name: 'Black',
  },
  10: {
    name: 'Blue',
  }
};

const HEX_COLORS = {
  Black: {
    id: 8,
  },
  Blue: {
    id: 10,
  },
};

const Color = ({
  colors, name, onChange, values,
}) => (
  <div>
    <SelectField
      floatingLabelText="Color"
      onChange={(event, index, value) => onChange({ target: { name, value: HEX_COLORS[value].id } })}
      value={ID_COLORS[values[name]].name}
      name={name}
    >
      {colors.name.map(name => <MenuItem style={{color: 'blue'}} key={name} value={name} primaryText={name} />)}
    </SelectField>
  </div>
);

Color.propTypes = {
  onChange: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default Color;
