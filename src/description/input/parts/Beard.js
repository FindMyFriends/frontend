// @flow
import React from 'react';
import LengthInput from './LengthInput';
import ColorInput from './ColorInput';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
|};
const Beard = ({
  onChange,
  values,
  selects,
}: Props) => (
  <React.Fragment>
    <LengthInput onChange={onChange('beard.length.value')} value={values['beard.length.value']}>
      Length
    </LengthInput>
    <ColorInput colors={selects.beardColors} value={values['beard.color_id']} onChange={onChange('beard.color_id')}>
      Color
    </ColorInput>
  </React.Fragment>
);

export default Beard;
