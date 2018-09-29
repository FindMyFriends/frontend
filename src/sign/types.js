// @flow
import type { Error } from '../validation';

export type Credentials = {|
  email: string,
  password: string,
|};

export type CredentialsErrors = {|
  email: Error,
  password: Error,
|};

export type RegistrationData = {|
  +email: ?string,
  +password: ?string,
  +general: {
    +firstname: ?string,
    +lastname: ?string,
    +sex: ?string,
    +ethnic_group_id: ?number,
    +birth_year: ?number,
  },
  +contact: {
    +facebook: ?string,
    +instagram: ?string,
    +phone_number: ?string,
  },
|};

export type RegistrationDataErrors = {|
  +email: Error,
  +password: Error,
  +general: {
    +firstname: Error,
    +lastname: Error,
    +sex: Error,
    +ethnic_group_id: Error,
    +birth_year: Error,
  },
  +contact: {
    +facebook: ?string,
    +instagram: ?string,
    +phone_number: ?string,
  },
|};
