// @flow
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Right = styled.div`
  float: right;
  margin-right: 15px;
`;

type Props = {|
  +onClick: () => (void),
  +children: string,
|};
const NextButton = ({ onClick, children }: Props) => (
  <Right>
    <Button variant="raised" onClick={onClick} color="primary">
      {children}
    </Button>
  </Right>
);

export default NextButton;
