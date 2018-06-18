// @flow
import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Header = styled.th`
  min-width: 100px;
`;

type Props = {|
  +children: string,
|};
const CardTitle = ({ children }: Props) => (
  <Header>
    <Typography variant="subheading">
      {children}
    </Typography>
  </Header>
);

export default CardTitle;
