// @flow

export const getTimelineSides = (options: ?Object): Array<string> => (
  options ? options.spot.met_at.timeline_side : []
);
