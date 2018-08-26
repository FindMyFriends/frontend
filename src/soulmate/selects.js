// @flow
import isEmpty from 'lodash';

export const getTotal = (
  demand: string,
  state: Object,
): number => (
  state.soulmate.info && state.soulmate.info[demand] && state.soulmate.info[demand].payload
    ? state.soulmate.info[demand].payload.total
    : 0
);

export const singleFetching = (
  demand: string,
  state: Object,
) => (
  (state.soulmate.all[demand] ? state.soulmate.all[demand].fetching : false)
    || (state.soulmate.info[demand] ? state.soulmate.info[demand].fetching : false)
);

export const fetchedDemandInfo = (demand: string, state: Object) => (
  state.soulmate.info
    && state.soulmate.info[demand]
    && !isEmpty(state.soulmate.info[demand].payload)
);

export const fetchedDemandSoulmates = (demand: string, state: Object) => (
  state.soulmate.all
    && state.soulmate.all[demand]
    && !isEmpty(state.soulmate.all[demand].payload)
);

export const getAllByDemand = (demand: string, state: Object) => (
  state.soulmate.all && state.soulmate.all[demand] ? state.soulmate.all[demand].payload : {}
);
