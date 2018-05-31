import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { onSelectChange } from './../../forms/events';

const Color = ({
  colors, name, onChange, values,
}) => {
  return (
    <div>
      <SelectField
        floatingLabelText="Color"
        onChange={onSelectChange(onChange, name)}
        value={values[name] || 0}
        name={name}
      >
        <MenuItem key={0} value={0} primaryText="unknown" />
        {
          Object.entries(colors).map((entry) => {
            const id = parseInt(entry[0], 10);
            const color = entry[1];
            return (
              <MenuItem
                style={{ color: color.hex }}
                key={id}
                value={id}
                primaryText={color.name}
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
