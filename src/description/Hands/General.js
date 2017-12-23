import React from 'react';
import Slider from 'material-ui/Slider';

const General = ({ selects, values, onChange }) => (
  <div>
    <h2>Hands</h2>
    <h3>General</h3>
    <p><span>{'Care'}</span></p>
    <Slider
      style={{width: 200}}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['hands.care']}
      onChange={onChange}
    />
    <p><span>{'Vein visibility'}</span></p>
    <Slider
      style={{width: 200}}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['hands.vein_visibility']}
      onChange={onChange}
    />
    <p><span>{'Joint visibility'}</span></p>
    <Slider
      style={{width: 200}}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['hands.joint_visibility']}
      onChange={onChange}
    />
    <br />
  </div>
);

export default General;
