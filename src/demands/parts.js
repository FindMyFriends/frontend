import React from 'react';
import Location from './Location';
import {
  parts as descriptionParts,
} from './../description/parts';

// const LAST_STEP = Object.keys(descriptionSteps()).length;
// export const MAIN_LOCATION = LAST_STEP + 1;
// export const LOCATION = 1;

export const parts = props => descriptionParts(props);
