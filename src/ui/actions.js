// @flow
export const RECEIVED_API_ERROR = 'RECEIVED_API_ERROR';
export const DISCARDED_MESSAGE = 'DISCARDED_MESSAGE';
export const RECEIVED_SUCCESS = 'RECEIVED_SUCCESS';
export const REQUESTED_CONFIRM = 'REQUESTED_CONFIRM';

export const requestedConfirm = (content: string, action: () => mixed) => ({
  type: REQUESTED_CONFIRM,
  content,
  severity: 'confirmation',
  action,
});

export const receivedApiError = (error: Object) => ({
  type: RECEIVED_API_ERROR,
  content: error.response.data.message,
  severity: 'error',
});

export const receivedSuccess = (content: string) => ({
  type: RECEIVED_SUCCESS,
  content,
  severity: 'success',
});

export const discardedMessage = () => ({
  type: DISCARDED_MESSAGE,
  content: null,
  severity: null,
});
