import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { discardedError } from './../ui/actions';

const Alert = ({ error, dispatch }) => {
  if (!error) {
    return null;
  }

  const handleHide = () => dispatch(discardedError());

  return (
    <Dialog
      title="Error"
      actions={
        <FlatButton
          label="Ok"
          primary
          onClick={handleHide}
        />
      }
      modal={false}
      open
      onRequestClose={handleHide}
    >
      {error}
    </Dialog>
  );
};

Alert.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default connect(state => ({
  error: state.uiError.message,
}))(Alert);
