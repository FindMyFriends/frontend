// @flow
import React from 'react';
import InputRating from '../../../components/Rating/InputRating';
import ColorInput from './ColorInput';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
|};
const Eyebrow = ({
  onChange,
  values,
  selects,
}: Props) => (
  <React.Fragment>
    <InputRating current={values['eyebrow.care']} onChange={onChange('eyebrow.care')}>
      Care
    </InputRating>
    <ColorInput colors={selects.eyebrowColors} value={values['eyebrow.color_id']} onChange={onChange('eyebrow.color_id')}>
      Color
    </ColorInput>
  </React.Fragment>
);

export default Eyebrow;
