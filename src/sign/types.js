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
