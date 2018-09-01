// @flow
export type Credentials = {|
  email: string,
  password: string,
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
|};

export type RegistrationDataErrors = {|
  +email: ?string,
  +password: ?string,
  +general: {
    +firstname: ?string,
    +lastname: ?string,
    +sex: ?string,
    +ethnic_group_id: ?string,
    +birth_year: ?string,
  },
|};
