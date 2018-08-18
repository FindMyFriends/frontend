// @flow
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Left = styled.div`
  float: left;
  margin-left: 15px;
`;

type Props = {|
  +onClick: () => (void),
  +children: string,
  +disabled: boolean,
|};
const PreviousButton = ({ onClick, children, disabled }: Props) => (
  <Left>
    <Button disabled={disabled} variant="raised" onClick={onClick} color="primary">
      {children}
    </Button>
  </Left>
);

export default PreviousButton;
