import React from 'react';
import styled from 'styled-components';
import Rater from 'react-rater';
import PropTypes from 'prop-types';
import 'react-rater/lib/react-rater.css';
import { onRating } from './../forms/events';

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

export const InputRating = ({
  max, current, name, onChange, children,
}) => (
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

InputRating.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

OutputRating.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};
