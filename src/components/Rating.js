import React from 'react';
import Rater from 'react-rater';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'react-rater/lib/react-rater.css';
import { onRating } from './../forms/events';
import { MaterialLabel } from './Label';

const Dot = styled.span`
  height: 11px;
  margin-right: 1px;
  width: 11px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
`;

const ClickableDot = Dot.extend`
  cursor: pointer;
`;

const EmptyDot = Dot.extend`
  height: 5px;
  width: 5px;
  background-color: #fff;
  border-color: #bbb;
  border-style: solid;
`;

const CustomRating = ({ willBeActive, isActive }) => {
  if (isActive) {
    return <Dot />;
  } else if (willBeActive) {
    return <ClickableDot />;
  }
  return <EmptyDot />;
};

export const InputRating = ({
  max, current, name, onChange, children,
}) => (
  <React.Fragment>
    <MaterialLabel>{children}</MaterialLabel>
    <br />
    <Rater
      total={max}
      rating={current}
      onRate={event => onRating(onChange, name, event)}
    >
      <CustomRating />
    </Rater>
  </React.Fragment>
);

export const OutputRating = ({ max, current }) => (
  <Rater
    total={max}
    rating={current}
    interactive={false}
  >
    <CustomRating />
  </Rater>
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

CustomRating.propTypes = {
  willBeActive: PropTypes.bool,
  isActive: PropTypes.bool,
};
