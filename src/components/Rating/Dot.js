// @flow
import styled from 'styled-components';

export const BIG = 'big';
export const SMALL = 'small';

export const Dot = styled.span`
  margin-right: 1px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
`;

export const BigDot = Dot.extend`
  height: 22px;
  width: 22px;
`;

export const SmallDot = Dot.extend`
  height: 11px;
  width: 11px;
`;
