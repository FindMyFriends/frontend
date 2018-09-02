// @flow
import React from 'react';
import styled from 'styled-components';
import { trim } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';
import OutputRating from '../../Rating/OutputRating';

const Row = styled.tr`
  text-align: left;
`;
const ProgressTd = styled.td`
  min-width: 40px;
`;

type TextProps = {|
  +title: string | Object,
  +text: string | Object,
|};
export const Text = ({ title, text }: TextProps) => {
  if (typeof text === 'string' && trim(text).length > 0) {
    return (
      <Row>
        <Title>{title}</Title>
        <td>
          <Typography variant="body1">
            {text}
          </Typography>
        </td>
      </Row>
    );
  }
  return null;
};

type ProgressProps = {|
  +title: string,
  +value: number,
|};
export const Progress = ({ title, value }: ProgressProps) => (
  value ? (
    <Row>
      <Title>{title}</Title>
      <ProgressTd title={value}>
        <OutputRating current={value} max={10} />
      </ProgressTd>
    </Row>
  ) : null
);
