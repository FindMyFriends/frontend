// @flow
import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withFormStyles } from './withFormStyles';
import Center from '../../../components/Center';
import IndeterminateCheckbox from '../../../components/MUI/IndeterminateCheckbox';
import ColorInput from './ColorInput';

type EyeProps = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +side: 'left' | 'right',
  +same: boolean,
|};
const Eye = ({
  onChange,
  values,
  selects,
  side,
  same,
}: EyeProps) => {
  return (
    <React.Fragment>
      <ColorInput
        colors={selects.eyeColors}
        value={values[`eye.${side}.color_id`]}
        onChange={
          (event) => {
            if (same) {
              onChange('eye.left.color_id')(event);
              onChange('eye.right.color_id')(event);
            } else {
              onChange(`eye.${side}.color_id`)(event);
            }
          }
        }
      >
        Color
      </ColorInput>
      <FormControlLabel
        label="Lenses"
        control={(
          <IndeterminateCheckbox
            checked={values[`eye.${side}.lenses`]}
            onChange={
              (event) => {
                if (same) {
                  onChange('eye.left.lenses')(event);
                  onChange('eye.right.lenses')(event);
                } else {
                  onChange(`eye.${side}.lenses`)(event);
                }
              }
            }
          />
)}
      />
    </React.Fragment>
  );
};

const NextToEachOther = styled.div`
  flex-wrap: wrap;
`;
const CenterAsEachOther = Center.extend`
  margin-top: 0;
  margin-left: 0;
`;

type EyesProps = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
|};
type EyesState = {|
  same: boolean,
|};
class Eyes extends React.Component<EyesProps, EyesState> {
  state = {
    same: true,
  };

  handleSameChange = () => {
    this.setState(prevState => ({ same: !prevState.same }));
    const { values, onChange } = this.props;
    const distributeOnChange = (from, to) => onChange(from)({ target: { value: values[to], type: 'any' } });
    distributeOnChange('eye.left.lenses', 'eye.right.lenses');
    distributeOnChange('eye.left.color_id', 'eye.right.color_id');
  };

  render() {
    const {
      onChange,
      values,
      selects,
    } = this.props;
    const components = [
      <Center key="same">
        <FormControlLabel
          control={(
            <Checkbox
              checked={this.state.same}
              onChange={this.handleSameChange}
              color="primary"
            />
)}
          label="Same"
        />
      </Center>,
    ];
    const eyes = [
      <Eye
        onChange={onChange}
        values={values}
        selects={selects}
        same={this.state.same}
        side="left"
        key="left"
      />,
      <Eye
        onChange={onChange}
        values={values}
        selects={selects}
        same={this.state.same}
        side="right"
        key="right"
      />,
    ];
    if (this.state.same) {
      components.push(eyes[0]);
      return (
        <CenterAsEachOther>
          {components}
        </CenterAsEachOther>
      );
    }
    components.push(...eyes);
    return (
      <NextToEachOther>
        {components}
      </NextToEachOther>
    );
  }
}

export default withFormStyles()(Eyes);
