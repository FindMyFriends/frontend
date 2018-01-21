import { requestedProperty, receivedProperty } from './actions';
import loadSchema, { replaceNull } from './../schema';

const schema = (method = 'GET') => loadSchema(`schema/v1/description/${method.toLowerCase()}.json`);

export const genders = () => (dispatch) => {
  dispatch(requestedProperty('genders'));
  schema()
    .then(schema => dispatch(receivedProperty('genders', schema.properties.general.properties.gender.enum)));
};

export const ethnicGroups = () => (dispatch) => {
  dispatch(requestedProperty('ethnicGroups'));
  schema()
    .then((schema) => {
      const ethnicGroup = schema.properties.general.properties.ethnic_group.properties;
      return dispatch(receivedProperty('ethnicGroups', { id: ethnicGroup.id.enum, name: ethnicGroup.name.enum }));
    });
};

export const breastSizes = () => (dispatch) => {
  dispatch(requestedProperty('breastSizes'));
  schema()
    .then((schema) => {
      return dispatch(receivedProperty('breastSizes', replaceNull(schema.properties.body.properties.breast_size.enum, 'N/A')));
    });
};

export const bodyBuilds = () => (dispatch) => {
  dispatch(requestedProperty('bodyBuilds'));
  schema()
    .then((schema) => {
      const builds = schema.properties.body.properties.build.properties;
      return dispatch(receivedProperty('bodyBuilds', { id: builds.id.enum, name: replaceNull(builds.name.enum, 'not sure') }));
    });
};

export const hairStyles = () => (dispatch) => {
  dispatch(requestedProperty('hairStyles'));
  schema()
    .then((schema) => {
      const styles = schema.properties.hair.properties.style.properties;
      return dispatch(receivedProperty('hairStyles', { id: styles.id.enum, name: replaceNull(styles.name.enum, 'not sure') }));
    });
};

const colorEnum = (color) => {
  return {
    id: color.properties.id.enum,
    hex: replaceNull(color.properties.hex.enum, '#000000'),
    name: replaceNull(color.properties.name.enum, 'not sure'),
  };
};

export const lengthUnits = () => (dispatch) => {
  dispatch(requestedProperty('lengthUnits'));
  schema()
    .then(schema => dispatch(receivedProperty('lengthUnits', schema.definitions.length_unit.enum.filter(unit => unit))));
};

export const shapes = () => (dispatch) => {
  dispatch(requestedProperty('shapes'));
  schema()
    .then((schema) => {
      const shapes = schema.properties.face.properties.shape.properties;
      return dispatch(receivedProperty('shapes', { id: shapes.id.enum, name: replaceNull(shapes.name.enum, 'not sure') }));
    });
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
