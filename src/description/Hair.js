import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LengthWithUnit from './components/LengthWithUnit';
import Color from './components/Color';
import { name as enumName } from './../enum';
import { onCheck, onSelectEnumChange } from './../forms/events';

const Hair = ({ selects: { hairColors, lengthUnits, hairStyles }, values, onChange }) => (
  <div>
    <h2>Hair</h2>
    <br />
    <SelectField
      floatingLabelText="Styles"
      onChange={onSelectEnumChange(onChange, 'hair.style_id', hairStyles)}
      value={enumName(values['hair.style_id'], hairStyles.id, hairStyles.name)}
      name="body.build_id"
    >
      {hairStyles.name.map(style => <MenuItem key={style} value={style} primaryText={style} />)}
    </SelectField>
    <br />
    <Color
      name="hair.color_id"
      colors={hairColors}
      onChange={onChange}
      values={values}
    />
    <br />
    <LengthWithUnit
      name="hair.length"
      values={values}
      onChange={onChange}
      units={lengthUnits}
    />
    <br />
    <Checkbox
      label="Highlights"
      name="hair.highlights"
      onCheck={onCheck(onChange, 'hair.highlights')}
      checked={values['hair.highlights']}
    />
    <br />
    <Checkbox
      label="Roots"
      name="hair.roots"
      onCheck={onCheck(onChange, 'hair.roots')}
      checked={values['hair.roots']}
    />
    <br />
    <Checkbox
      label="Nature"
      name="hair.nature"
      onCheck={onCheck(onChange, 'hair.nature')}
      checked={values['hair.nature']}
    />
    <br />
  </div>
);

Hair.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Hair;
