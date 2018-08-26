// @flow
import type { BirthYear } from '../description/types';

export type RegistrationData = {|
  +email: string,
  +password: string,
  +general: {
    +firstname: string,
    +lastname: string,
    +sex: string,
    +ethnic_group_id: number,
    +birth_year: BirthYear,
  },
|};
