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
    .then(schema => dispatch(receivedProperty('races', schema.properties.general.properties.race.properties.value.enum)));
};

export const ages = () => (dispatch) => {
  dispatch(requestedProperty('ages'));
  schema()
    .then(schema => dispatch(receivedProperty('ages', schema.properties.general.properties.age.properties.from)));
};

export const bodyBuilds = () => (dispatch) => {
  dispatch(requestedProperty('bodyBuilds'));
  schema()
    .then(schema => dispatch(receivedProperty('bodyBuilds', schema.properties.body.properties.build.properties.value.enum)));
};

const colorEnum = (color) => {
  return {
    hex: color.properties.hex.enum
      .filter(hex => hex),
    name: color.properties.name.enum
      .filter(name => name),
  };
};

export const skinColors = () => (dispatch) => {
  dispatch(requestedProperty('skinColors'));
  schema()
    .then(schema => dispatch(receivedProperty('skinColors', schema.properties.body.properties.skin_color.properties.name.enum)));
};

export const lengthUnits = () => (dispatch) => {
  dispatch(requestedProperty('lengthUnits'));
  schema()
    .then(schema => dispatch(receivedProperty('lengthUnits', schema.properties.hair.properties.length.properties.unit.enum.filter(unit => unit))));
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
        colorEnum(schema.properties.face.properties.beard.properties.color),
      ));
    });
};

export const eyebrowColors = () => (dispatch) => {
  dispatch(requestedProperty('eyebrowColors'));
  schema()
    .then((schema) => {
      return dispatch(receivedProperty(
        'eyebrowColors',
        colorEnum(schema.properties.face.properties.eyebrow.properties.color),
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
