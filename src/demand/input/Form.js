// @flow
import React from 'react';
import { steps } from './../parts/steps';
import { default as PartForm } from './../../components/Form';

type FormType = {
  children: string,
};
const Form = (props: FormType) => (
  <PartForm {...props} steps={steps}>{props.children}</PartForm>
);

export default Form;
