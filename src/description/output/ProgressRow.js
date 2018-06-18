// @flow
import React from 'react';
import styled from 'styled-components';
import OutputRating from '../../components/Rating/OutputRating';
import CardTitle from './CardTitle';

const Row = styled.tr`
  text-align: left;
`;

const ProgressTd = styled.td`
  min-width: 40px;
`;

type Props = {|
  +title: string,
  +value: number,
|};
export const ProgressRow = ({ title, value }: Props) => (
  <Row>
    <CardTitle>{title}</CardTitle>
    <ProgressTd title={value}>
      <OutputRating current={value} max={10} />
    </ProgressTd>
  </Row>
);

export default ProgressRow;
