// @flow
import * as validation from '../../validation/index';
import type { Credentials, CredentialsErrors } from '../types';

export const errors = (credentials: Credentials): CredentialsErrors => ({
  email: validation.email(credentials.email),
  password: validation.password(credentials.password),
});

export const anyErrors = (credentials: Credentials): boolean => (
  [
    validation.email(credentials.email),
    validation.password(credentials.password),
  ].filter(value => value).length > 0
);
