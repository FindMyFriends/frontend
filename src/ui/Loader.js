// @flow
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Center from '../components/Center';

const Loader = () => {
  return (
    <Center>
      <Typography variant="display1">Loading...</Typography>
      <CircularProgress size={50} />
    </Center>
  );
};

export default Loader;
