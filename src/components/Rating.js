import React from 'react';
import styled from 'styled-components';
import Rater from 'react-rater'
import { onCheck, onRating, onSelectEnumChange } from './../forms/events';
import 'react-rater/lib/react-rater.css'

const Label = styled.label`
  line-height: 22px;
  top: 38px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  z-index: 1;
  transform: scale(0.75) translate(0px, -28px);
  transform-origin: left top 0px;
  pointer-events: none;
  user-select: none;
  color: rgba(0, 0, 0, 0.3);
  font-family: Roboto, sans-serif;
  font-size: 12px;
`;

export const InputRating = ({ max, current, name, onChange, children }) => (
  <React.Fragment>
    <Label>{children}</Label>
    <br />
    <Rater
      total={max}
      rating={current}
      onRate={event => onRating(onChange, name, event)}
    />
  </React.Fragment>
);

export const OutputRating = ({ max, current }) => (
  <Rater
    total={max}
    rating={current}
    interactive={false}
  />
);
