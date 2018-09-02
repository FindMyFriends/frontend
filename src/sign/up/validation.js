// @flow
import * as validation from '../../validation/index';
import type { RegistrationData, RegistrationDataErrors } from '../types';

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
  validation.anyErrors(errors(registrationData))
);
