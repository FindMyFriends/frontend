// @flow
import { Dot } from './Dot';

export const EmptyDot = Dot.extend`
  background-color: #fff;
  border-color: #bbb;
  border-style: solid;
`;

export const EmptySmallDot = EmptyDot.extend`
  height: 4px;
  width: 4px;
`;

export const EmptyBigDot = EmptyDot.extend`
  height: 14px;
  width: 14px;
`;
