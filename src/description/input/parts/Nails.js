// @flow
import React from 'react';
import InputRating from '../../../components/Rating/InputRating';
import LengthInput from './LengthInput';
import ColorInput from './ColorInput';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
|};
const Hair = ({
  onChange,
  values,
  selects,
}: Props) => (
  <React.Fragment>
    <ColorInput colors={selects.nailsColors} value={values['hands.nails.color_id']} onChange={onChange('hands.nails.color_id')}>
      Color
    </ColorInput>
    <LengthInput onChange={onChange('hands.nails.length.value')} value={values['hands.nails.length.value']}>
      Length
    </LengthInput>
    <InputRating current={values['hands.nails.care']} onChange={onChange('hands.nails.care')}>
      Care
    </InputRating>
  </React.Fragment>
);

export default Hair;
