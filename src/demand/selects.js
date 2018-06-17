// @flow

export const getTimelineSides = (options: ?Object): Array<string> => (
  options ? options.location.met_at.timeline_side : []
);
