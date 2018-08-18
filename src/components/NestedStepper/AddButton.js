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
  +disabled: boolean,
|};
const AddButton = ({ onClick, children, disabled }: Props) => (
  <Right>
    <Button disabled={disabled} variant="raised" onClick={onClick} color="primary">
      {children}
    </Button>
  </Right>
);

export default AddButton;
