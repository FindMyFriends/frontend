// @flow
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IndeterminateCheckbox from '../../../components/MUI/IndeterminateCheckbox';
import InputRating from '../../../components/Rating/InputRating';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
|};
const Teeth = ({ onChange, values }: Props) => (
  <React.Fragment>
    <InputRating current={values['teeth.care']} onChange={onChange('teeth.care')}>
      Care
    </InputRating>
    <FormControlLabel
      label="Braces"
      control={(
        <IndeterminateCheckbox
          checked={values['teeth.braces']}
          onChange={onChange('teeth.braces')}
        />
)}
    />
  </React.Fragment>
);

export default Teeth;
