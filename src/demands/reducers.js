import extend from 'extend';
import * as R from 'ramda';
import {
  RECEIVED_ALL_DEMANDS,
  RECEIVED_PAGINATION_FOR_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
  RECEIVED_DEMAND_SCHEMA_PROPERTY,
  RECEIVED_DEMAND_OPTIONS,
} from './actions';

export const demand = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_SINGLE_DEMAND:
      return { ...state, single: action.demand, etag: action.etag };
    case RECEIVED_ALL_DEMANDS:
      return { ...state, all: action.demands };
    case RECEIVED_PAGINATION_FOR_ALL_DEMANDS:
      return { ...state, pages: action.pages };
    case RECEIVED_DEMAND_OPTIONS:
      return { ...state, options: action.options };
    default:
      return state;
  }
};

export const schema = (state = { fetching: false }, action) => {
  switch (action.type) {
    case RECEIVED_DEMAND_SCHEMA_PROPERTY:
      return { ...state, [action.property]: action.value };
    default:
      return state;
  }
};

export const getPrettyDemand = (demand, options) => {
  if (R.isEmpty(demand) || R.isEmpty(options)) {
    return { };
  }
  return extend(
    true,
    {},
    demand,
    {
      general: {
        ethnic_group: options.general.ethnic_group[demand.general.ethnic_group_id],
      },
      body: {
        build: options.body.build[demand.body.build_id],
        weight: `${demand.body.weight.value} ${demand.body.weight.unit}`,
        height: `${demand.body.height.value} ${demand.body.height.unit}`,
      },
      hair: {
        style: options.hair.style[demand.hair.style_id],
        color: options.hair.color[demand.hair.color_id].name,
        length: `${demand.hair.length.value} ${demand.hair.length.unit}`,
      },
      face: {
        shape: options.face.shape[demand.face.shape_id],
      },
      eyebrow: {
        color: options.eyebrow.color[demand.eyebrow.color_id].name,
      },
      eye: {
        left: {
          color: options.definitions.eye.color[demand.eye.left.color_id].name,
        },
        right: {
          color: options.definitions.eye.color[demand.eye.right.color_id].name,
        },
      },
      hands: {
        nails: {
          color: options.hands.nails.color[demand.hands.nails.color_id].name,
          length: `${demand.hands.nails.length.value} ${demand.hands.nails.length.unit}`,
        },
        hair: {
          color: options.hands.hair.color[demand.hands.hair.color_id].name,
        },
      },
    },
  );
};
