// @flow
import memoize from 'memoizee';
import * as validation from '../../validation/index';
import type { Credentials, CredentialsErrors } from '../types';

export const errors = memoize((credentials: Credentials): CredentialsErrors => ({
  email: validation.email(credentials.email),
  password: validation.password(credentials.password),
}));

export const anyErrors = (credentials: Credentials): boolean => (
  validation.anyErrors(errors(credentials))
);
