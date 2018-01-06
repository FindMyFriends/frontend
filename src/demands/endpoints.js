import axios from 'axios';
import {
  requestedAdding,
  addedDemand,
  receivedAll,
  requestedAll,
  receivedSingle,
  requestedSingle,
  receivedPaginationForAll,
  requestedProperty,
  receivedProperty,
  receivedReconsideration,
  requestedReconsidering,
} from './actions';
import loadSchema from './../schema';

const schema = (method = 'GET') => loadSchema(`schema/v1/demand/${method.toLowerCase()}.json`);

export const all = (pagination = { page: 1, perPage: 20 }) => (dispatch) => {
  dispatch(requestedAll());
  axios.get(`/v1/demands?page=${pagination.page}&per_page=${pagination.perPage}`)
    .then((response) => {
      dispatch(receivedPaginationForAll(response.headers.link));
      dispatch(receivedAll(response.data));
    });
};

export const single = id => (dispatch) => {
  dispatch(requestedSingle(id));
  return axios.get(`/v1/demands/${id}`)
    .then((response) => {
      dispatch(receivedSingle(id, response.data, response.headers.etag));
      return response.data;
    });
};

export const add = demand => (dispatch) => {
  dispatch(requestedAdding(demand));
  axios.post('/v1/demands', demand)
    .then(response => dispatch(addedDemand(demand, response.headers.location)));
};

export const reconsider = (id, demand, etag) => (dispatch) => {
  dispatch(requestedReconsidering(id, demand));
  axios.put(`/v1/demands/${id}`, demand, { headers: { 'if-match': etag } })
    .then(response => dispatch(receivedReconsideration(id, response.data)));
};

export const genders = () => (dispatch) => {
  dispatch(requestedProperty('genders'));
  schema()
    .then(schema => dispatch(receivedProperty('genders', schema.properties.general.properties.gender.enum)));
};

export const races = () => (dispatch) => {
  dispatch(requestedProperty('races'));
  schema()
    .then((schema) => {
      const race = schema.properties.general.properties.race.properties;
      return dispatch(receivedProperty('races', { id: race.id.enum, name: race.name.enum }));
    });
};

export const bodyBuilds = () => (dispatch) => {
  dispatch(requestedProperty('bodyBuilds'));
  schema()
    .then((schema) => {
      const builds = schema.properties.body.properties.build.properties;
      return dispatch(receivedProperty('bodyBuilds', { id: builds.id.enum, name: builds.name.enum }));
    });
};

const colorEnum = (color) => {
  return {
    id: color.properties.id.enum
      .filter(id => id),
    hex: color.properties.hex.enum
      .filter(hex => hex),
    name: color.properties.name.enum
      .filter(name => name),
  };
};

export const skinColors = () => (dispatch) => {
  dispatch(requestedProperty('skinColors'));
  schema()
    .then((schema) => {
      return dispatch(receivedProperty(
        'skinColors',
        colorEnum(schema.properties.body.properties.skin_color),
      ));
    });
};

export const lengthUnits = () => (dispatch) => {
  dispatch(requestedProperty('lengthUnits'));
  schema()
    .then(schema => dispatch(receivedProperty('lengthUnits', schema.definitions.length_unit.enum.filter(unit => unit))));
};

export const shapes = () => (dispatch) => {
  dispatch(requestedProperty('shapes'));
  schema()
    .then(schema => dispatch(receivedProperty('shapes', schema.properties.face.properties.shape.enum.filter(shape => shape))));
};

export const ratings = () => (dispatch) => {
  dispatch(requestedProperty('ratings'));
  schema()
    .then(schema => dispatch(receivedProperty('ratings', schema.definitions.rating)));
};


export const timelineSides = () => (dispatch) => {
  dispatch(requestedProperty('timelineSides'));
  schema()
    .then(schema => dispatch(receivedProperty('timelineSides', schema.properties.location.properties.met_at.properties.timeline_side.enum.filter(side => side))));
};

export const hairColors = () => (dispatch) => {
  dispatch(requestedProperty('hairColors'));
  schema()
    .then((schema) => {
      return dispatch(receivedProperty(
        'hairColors',
        colorEnum(schema.properties.hair.properties.color),
      ));
    });
};

export const beardColors = () => (dispatch) => {
  dispatch(requestedProperty('beardColors'));
  schema()
    .then((schema) => {
      return dispatch(receivedProperty(
        'beardColors',
        colorEnum(schema.properties.beard.properties.color),
      ));
    });
};

export const eyebrowColors = () => (dispatch) => {
  dispatch(requestedProperty('eyebrowColors'));
  schema()
    .then((schema) => {
      return dispatch(receivedProperty(
        'eyebrowColors',
        colorEnum(schema.properties.eyebrow.properties.color),
      ));
    });
};

export const eyeColors = () => (dispatch) => {
  dispatch(requestedProperty('eyeColors'));
  schema()
    .then((schema) => {
      return dispatch(receivedProperty(
        'eyeColors',
        colorEnum(schema.definitions.eye.properties.color),
      ));
    });
};

export const nailColors = () => (dispatch) => {
  dispatch(requestedProperty('nailColors'));
  schema()
    .then((schema) => {
      return dispatch(receivedProperty(
        'nailColors',
        colorEnum(schema.properties.hands.properties.nails.properties.color),
      ));
    });
};
