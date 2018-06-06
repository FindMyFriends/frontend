// @flow
import React from 'react';
import styled from 'styled-components';
import OutputRating from '../../rating/OutputRating';

const Row = styled.tr`
  text-align: left;
`;

const Header = styled.th`
  min-width: 100px;
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
    <Header>{title}</Header>
    <ProgressTd title={value}>
      <OutputRating current={value} max={10} />
    </ProgressTd>
  </Row>
);

export default ProgressRow;
