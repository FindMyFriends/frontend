import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';

const Teeth = ({ selects, values, onChange }) => (
  <div>
    <h2>Teeth</h2>
    <p><span>{'Care'}</span></p>
    <Slider
      style={{width: 200}}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['face.teeth.care']}
      onChange={onChange}
    />
    <br />
    <Checkbox
      label="Braces"
      name="face.teeth.braces"
      value={values['face.teeth.braces']}
    />
    <br />
  </div>
);

export default Teeth;
