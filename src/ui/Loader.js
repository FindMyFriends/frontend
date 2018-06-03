// @flow
import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content:flex-start; 
  flex-direction: column;
  margin-left: 14px;
`;

const Loader = () => {
  return (
    <Center>
      <Typography variant="display1">Loading...</Typography>
      <CircularProgress size={50} />
    </Center>
  );
};

export default Loader;