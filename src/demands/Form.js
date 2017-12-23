import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import { GithubPicker } from 'react-color';

const General = ({ selects, values, onChange }) => (
  <div>
    <h2>General</h2>
    <TextField
      floatingLabelText="Firstname"
      onChange={onChange}
      value={values['general.firstname']}
      name="general.firstname"
    />
    <br />
    <SelectField
      floatingLabelText="Gender"
      onChange={(event, index, value) => onChange({ target: { name: 'general.gender', value} })}
      value={values['general.gender']}
      name="general.gender"
    >
    {selects.genders.map(gender => <MenuItem key={gender} value={gender} primaryText={gender} />)}
    </SelectField>
    <br />
    <SelectField
      floatingLabelText="Race"
      onChange={(event, index, value) => onChange({ target: { name: 'general.race', value} })}
      value={values['general.race']}
      name="general.race"
    >
    {selects.races.map(race => <MenuItem key={race} value={race} primaryText={race} />)}
    </SelectField>
    <br />
    <TextField
      type="number"
      floatingLabelText="Age from"
      onChange={onChange}
      value={values['general.age.from']}
      name="general.age.from"
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Age to"
      onChange={onChange}
      value={values['general.age.to']}
      name="general.age.to"
    />
  </div>
);

const Body = ({ selects, values, onChange }) => (
  <div>
    <h2>Body</h2>
    <SelectField
      floatingLabelText="Build"
      onChange={(event, index, value) => onChange({ target: { name: 'body.build', value} })}
      value={values['body.build']}
      name="body.build"
    >
    {selects.bodyBuilds.map(build => <MenuItem key={build} value={build} primaryText={build} />)}
    </SelectField>
    <br />
    <SelectField
      floatingLabelText="Skin"
      onChange={(event, index, value) => onChange({ target: { name: 'body.skin', value} })}
      value={values['body.skin']}
      name="body.skin"
    >
    {selects.skinColors.map(color => <MenuItem key={color} value={color} primaryText={color} />)}
    </SelectField>
    <br />
    <TextField
      type="number"
      floatingLabelText="Weight"
      onChange={onChange}
      value={values['body.weight']}
      name="body.weight"
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Height"
      onChange={onChange}
      value={values['body.height']}
      name="body.height"
    />
  </div>
);

const Hair = ({ selects, values, onChange }) => (
  <div>
    <h2>Hair</h2>
    <br />
    <TextField
      floatingLabelText="Style"
      onChange={onChange}
      value={values['hair.style']}
      name="hair.style"
    />
    <br />
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.hairColors.name[selects.hairColors.hex.indexOf(values['hair.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'hair.color', value } })}
      colors={selects.hairColors.hex}
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Length"
      onChange={onChange}
      name="hair.length.value"
      value={values['hair.length.value']}
    />
    <br />
    <SelectField
      floatingLabelText="Unit"
      onChange={(event, index, value) => onChange({ target: { name: 'hair.length.unit', value} })}
      value={values['hair.length.unit']}
      name="hair.length.unit"
    >
    {selects.lengthUnits.map(unit => <MenuItem key={unit} value={unit} primaryText={unit} />)}
    </SelectField>
    <br />
    <Checkbox
      label="Highlights"
      name="hair.highlights"
      value={values['hair.highlights']}
    />
    <br />
    <Checkbox
      label="Roots"
      name="hair.roots"
      value={values['hair.roots']}
    />
    <br />
    <Checkbox
      label="Nature"
      name="hair.nature"
      value={values['hair.nature']}
    />
    <br />
  </div>
);

const FaceGeneral = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>General</h3>
    <p>
      <span>{'Care'}</span>
    </p>
    <Slider
      style={{width: 200}}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['face.care']}
      onChange={onChange}
    />
    <SelectField
      floatingLabelText="Shape"
      onChange={(event, index, value) => onChange({ target: { name: 'face.shape', value} })}
      value={values['face.shape']}
      name="face.shape"
    >
    {selects.shapes.map(shape => <MenuItem key={shape} value={shape} primaryText={shape} />)}
    </SelectField>
    <br />
  </div>
);

const FaceEyebrow = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Eyebrow</h3>
    <p>
      <span>{'Care'}</span>
    </p>
    <Slider
      style={{width: 200}}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['face.eyebrow.care']}
      onChange={onChange}
    />
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.eyebrowColors.name[selects.eyebrowColors.hex.indexOf(values['face.eyebrow.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'face.eyebrow.color', value } })}
      colors={selects.eyebrowColors.hex}
    />
    <br />
  </div>
);

const FaceEye = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Left eye</h3>
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.eyeColors.name[selects.eyeColors.hex.indexOf(values['face.left_eye.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'face.left_eye.color', value } })}
      colors={selects.eyeColors.hex}
    />
    <br />
    <Checkbox
      label="Lenses"
      name="face.left_eye.lenses"
      value={values['face.left_eye.lenses']}
    />
    <h3>Right eye</h3>
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.eyeColors.name[selects.eyeColors.hex.indexOf(values['face.right_eye.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'face.right_eye.color', value } })}
      colors={selects.eyeColors.hex}
    />
    <Checkbox
      label="Lenses"
      name="face.right_eye.lenses"
      value={values['face.right_eye.lenses']}
    />
    <br />
  </div>
);

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

const FaceBeard = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Beard</h3>
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.beardColors.name[selects.beardColors.hex.indexOf(values['face.beard.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'face.beard.color', value } })}
      colors={selects.beardColors.hex}
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Length"
      onChange={onChange}
      name="face.beard.length.value"
      value={values['face.beard.length.value']}
    />
    <br />
    <SelectField
      floatingLabelText="Unit"
      onChange={(event, index, value) => onChange({ target: { name: 'face.beard.length.unit', value} })}
      value={values['face.beard.length.unit']}
      name="face.beard.length.unit"
    >
    {selects.lengthUnits.map(unit => <MenuItem key={unit} value={unit} primaryText={unit} />)}
    </SelectField>
    <br />
  </div>
);

const Current = ({ step, label, onTurn, steps, ...rest }) => {
  const last = step === Math.max(Object.keys(steps)),
    first = step === 1;
  return [
    steps[step],
    first || <RaisedButton key="previous" onClick={() => onTurn(-1)} label="Previous" primary />,
    <RaisedButton key="next|submit" onClick={last ? rest.onSubmit : () => onTurn(+1)} label={last ? label : 'Next'} primary />
  ];
};

const GENERAL = 1,
  BODY = 2,
  HAIR = 3,
  FACE_GENERAL = 4,
  FACE_BEARD = 5,
  FACE_EYEBROW = 7,
  FACE_EYES = 6,
  TEETH = 7;

const Form = props => {
  const steps = {
    [GENERAL]: <General key={GENERAL} {...props} />,
    [BODY]: <Body key={BODY} {...props} />,
    [HAIR]: <Hair key={HAIR} {...props} />,
    [FACE_GENERAL]: <FaceGeneral key={FACE_GENERAL} {...props} />,
    [FACE_BEARD]: <FaceBeard key={FACE_BEARD} {...props} />,
    [FACE_EYEBROW]: <FaceEyebrow key={FACE_EYEBROW} {...props} />,
    [FACE_EYES]: <FaceEye key={FACE_EYES} {...props} />,
    [TEETH]: <Teeth key={TEETH} {...props} />,
  };
  if (props.values['general.gender'] === 'woman') {
    delete steps[FACE_BEARD];
  }
  return <Current {...props} steps={steps} />
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default Form;
