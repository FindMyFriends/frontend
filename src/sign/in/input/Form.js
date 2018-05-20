import React from 'react';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content:flex-start; 
  flex-direction: column;
  margin-left: 14px;
`;

const Form = ({ onChange, onSubmit, credentials }) => {
  return (
    <Center>
      <TextField
        type="email"
        floatingLabelText="Email"
        value={credentials.email}
        onChange={onChange}
        name="email"
      />
      <TextField
        type="password"
        floatingLabelText="Password"
        value={credentials.password}
        onChange={onChange}
        name="password"
      />
      <RaisedButton label="Sign in" onClick={onSubmit} />
    </Center>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
};

export default Form;
