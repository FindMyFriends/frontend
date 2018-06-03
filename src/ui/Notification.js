// @flow
import React from 'react';
import { connect } from 'react-redux';
import { discardedMessage, RECEIVED_API_ERROR, RECEIVED_SUCCESS, REQUESTED_CONFIRM } from './actions';
import Snackbar from './Snackbar';
import Alert from './Alert';
import Confirmation from './Confirmation';

type Props = {|
  +content: string,
  +type: string,
  +dispatch: () => mixed,
  +action: () => mixed,
  +discardedMessage: () => (void),
|};
const Notification = ({ content, type, action, ...props }: Props) => {
  if (!content) {
    return null;
  }

  if (type === RECEIVED_SUCCESS) {
    return (
      <Snackbar onClose={props.discardedMessage}>
        {content}
      </Snackbar>
    );
  } else if (type === RECEIVED_API_ERROR) {
    return (
      <Alert onClose={props.discardedMessage}>
        {content}
      </Alert>
    );
  } else if (type === REQUESTED_CONFIRM) {
    return (
      <Confirmation onClose={props.discardedMessage} onConfirm={action}>
        {content}
      </Confirmation>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  content: state.message.content,
  type: state.message.type,
  action: state.message.action,
});
const mapDispatchToProps = dispatch => ({
  discardedMessage: () => dispatch(discardedMessage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Notification);