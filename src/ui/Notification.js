// @flow
import React from 'react';
import { connect } from 'react-redux';
import { discardedMessage, RECEIVED_API_ERROR, RECEIVED_SUCCESS, REQUESTED_CONFIRM } from './../ui/actions';
import FlashMessage from './FlashMessage';
import Alert from './Alert';
import Confirmation from './Confirmation';

type Props = {
  content: string,
  type: string,
  dispatch: (any) => mixed,
  action: () => mixed,
};

const Notification = ({
  content, type, action, dispatch,
}: Props) => {
  if (!content) {
    return null;
  }

  const handleHide = () => dispatch(discardedMessage());

  if (type === RECEIVED_SUCCESS) {
    return <FlashMessage onClose={handleHide} content={content} />;
  } else if (type === RECEIVED_API_ERROR) {
    return <Alert onClose={handleHide} content={content} />;
  } else if (type === REQUESTED_CONFIRM) {
    return <Confirmation onClose={handleHide} onConfirm={action} content={content} />;
  }
  return null;
};

export default connect(state => ({
  content: state.message.content,
  type: state.message.type,
  action: state.message.action,
}))(Notification);
