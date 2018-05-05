import React from 'react';
import Rater from 'react-rater';
import PropTypes from 'prop-types';
import 'react-rater/lib/react-rater.css';
import { onRating } from './../forms/events';
import { MaterialLabel } from './Label';

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
