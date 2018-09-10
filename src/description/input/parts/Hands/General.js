// @flow
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import InputRating from '../../../../components/Rating/InputRating';
import IndeterminateCheckbox from '../../../../components/MUI/IndeterminateCheckbox';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
|};
const General = ({ onChange, values }: Props) => (
  <React.Fragment>
    <InputRating current={values['hands.care']} onChange={onChange('hands.care')}>
      Care
    </InputRating>
    <FormControlLabel
      label="Visible veins"
      control={(
        <IndeterminateCheckbox
          checked={values['hands.visible_veins']}
          onChange={onChange('hands.visible_veins')}
        />
)}
    />
  </React.Fragment>
);

export default General;
