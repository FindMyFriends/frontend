import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LengthWithUnit from './../input/LengthWithUnit';
import Color from './../input/Color';
import { onCheck, onSelectEnumChange } from './../../forms/events';

const NotNatureHair = ({ values, onChange }) => {
  if (values['hair.nature'] === true) {
    return null;
  }
  return (
    <span>
      <Checkbox
        label="Highlights"
        name="hair.highlights"
        onCheck={onCheck(onChange, 'hair.highlights')}
        checked={values['hair.highlights']}
      />
      <Checkbox
        label="Roots"
        name="hair.roots"
        onCheck={onCheck(onChange, 'hair.roots')}
        checked={values['hair.roots']}
      />
    </span>
  );
};

const Hair = ({ selects: { hairColors, lengthUnits, hairStyles }, values, onChange }) => (
  <div>
    <SelectField
      floatingLabelText="Styles"
      onChange={onSelectEnumChange(onChange, 'hair.style_id', hairStyles)}
      value={hairStyles[values['hair.style_id']]}
      name="body.build_id"
    >
      {Object.values(hairStyles).map(style => (
        <MenuItem key={style} value={style} primaryText={style} />
      ))}
    </SelectField>
    <Color
      name="hair.color_id"
      colors={hairColors}
      onChange={onChange}
      values={values}
    />
    <LengthWithUnit
      name="hair.length"
      values={values}
      onChange={onChange}
      units={lengthUnits}
    />
    <Checkbox
      label="Nature"
      name="hair.nature"
      onCheck={onCheck(onChange, 'hair.nature')}
      checked={values['hair.nature']}
    />
    <NotNatureHair values={values} onChange={onChange} />
  </div>
);

Hair.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

NotNatureHair.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default Hair;
