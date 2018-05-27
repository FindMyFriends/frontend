// @flow
import React from 'react';
import { steps, MAIN_GENERAL } from './../../description/parts/steps';
import { default as PartForm } from './../../components/Form';
import EvolutionGeneral from './../../description/parts/EvolutionGeneral';

type FormType = {
  children: string,
};
const Form = (props: FormType) => (
  <PartForm
    {...props}
    steps={
      () => steps(
        props,
        {
          [MAIN_GENERAL]: {
            title: 'General',
            parts: [
              {
                component: <EvolutionGeneral key={0} {...props} />,
                title: 'General',
              },
            ],
          },
        },
      )
    }
  >
    {props.children}
  </PartForm>
);

export default Form;
