// @flow
import * as validation from '../validation';
import type { RegistrationData, RegistrationDataErrors } from './types';

export const errors = (registrationData: RegistrationData): RegistrationDataErrors => ({
  email: validation.email(registrationData.email),
  password: validation.password(registrationData.password),
  general: {
    firstname: validation.required(registrationData.general.firstname),
    lastname: validation.required(registrationData.general.lastname),
    sex: validation.required(registrationData.general.sex),
    birth_year: validation.birthYearRange(registrationData.general.birth_year),
    ethnic_group_id: validation.required(registrationData.general.ethnic_group_id),
  },
});

export const anyErrors = (registrationData: RegistrationData): boolean => (
  [
    validation.email(registrationData.email),
    validation.password(registrationData.password),
    validation.required(registrationData.general.firstname),
    validation.required(registrationData.general.lastname),
    validation.required(registrationData.general.sex),
    validation.birthYearRange(registrationData.general.birth_year),
    validation.required(registrationData.general.ethnic_group_id),
  ].filter(value => value).length > 0
);
