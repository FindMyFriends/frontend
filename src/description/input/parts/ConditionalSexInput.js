// @flow
import React from 'react';
import SexInput from './SexInput';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const ConditionalSexInput = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => {
  const handleChange = (event) => {
    onChange('general.sex')(event);
    if (event.target.value === 'man') {
      onChange('body.breast_size')({ target: { ...event.target, value: null } });
    }
  };

  return (
    <SexInput
      onChange={handleChange}
      value={values['general.sex'] || ''}
      selects={selects.sex}
      classes={classes}
    />
  );
};

export default ConditionalSexInput;
