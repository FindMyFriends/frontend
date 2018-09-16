// @flow
import { create, invalidate } from '../token/endpoints';
import { join } from '../seeker/endpoints';
import * as session from '../access/session';
import { receivedSuccess as receivedSuccessMessage } from '../ui/actions';
import type { Credentials, RegistrationData } from './types';

export const signIn = (
  credentials: Credentials,
  next: (void) => void,
) => (dispatch: (mixed) => Object) => {
  dispatch(create(
    credentials.email,
    credentials.password,
    data => Promise.resolve()
      .then(() => session.start({ expiration: data.expiration, value: data.token }))
      .then(() => dispatch(receivedSuccessMessage('You have been successfully signed in')))
      .then(next),
  ));
};

export const signOut = (next: (void) => void) => {
  invalidate(() => Promise.resolve()
    .then(session.destroy)
    .then(next));
};

export const signUp = (
  data: RegistrationData,
  next: (Object) => Promise<any>,
) => (dispatch: (mixed) => Object) => (
  dispatch(join(
    {
      ...data,
      general: {
        ...data.general,
        birth_year: parseInt(data.general.birth_year, 10),
      },
    },
    joinInformation => Promise.resolve()
      .then(() => dispatch(receivedSuccessMessage('To complete sign up process, please follow email instructions.')))
      .then(() => next(joinInformation)),
  ))
);
