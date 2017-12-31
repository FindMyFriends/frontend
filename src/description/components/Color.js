import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { name as enumName, combined } from './../../enum';
import { onSelectEnumChange } from './../../forms/onChange';

const Color = ({
  colors, name, onChange, values,
}) => {
  const nameWithHex = {
    ...combined(colors.name, colors.hex),
    White: '#000000',
  };
  return (
    <div>
      <SelectField
        floatingLabelText="Color"
        onChange={onSelectEnumChange(onChange, name, colors)}
        value={enumName(values[name], colors.id, colors.name)}
        name={name}
      >
        {
          colors.name.map((name) => {
            return (
              <MenuItem
                style={{ color: nameWithHex[name] }}
                key={name}
                value={name}
                primaryText={name}
              />
            );
          })
        }
      </SelectField>
    </div>
  );
};

Color.propTypes = {
  onChange: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default Color;
