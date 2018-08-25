// @flow

import { isEmpty } from 'lodash';

export const getTimelineSides = (options: Object): Array<string> => (
  !isEmpty(options) ? options.spot.met_at.timeline_side : []
);
