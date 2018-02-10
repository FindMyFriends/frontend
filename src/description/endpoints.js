import extend from 'extend';
import { requestedProperty, receivedProperty } from './actions';
import { loadSchema, loadOptions } from './../schema';

const options = () => loadOptions('v1/demands');
const schema = (method = 'GET') => loadSchema(`schema/v1/demand/${method.toLowerCase()}.json`);

export const readableDescription = (description, options) => {
  return extend(
    true,
    {},
    description,
    {
      general: {
        ethnic_group: options.general.ethnic_group[description.general.ethnic_group_id],
      },
      body: {
        build: options.body.build[description.body.build_id],
        weight: `${description.body.weight.value} ${description.body.weight.unit}`,
        height: `${description.body.height.value} ${description.body.height.unit}`,
      },
      hair: {
        style: options.hair.style[description.hair.style_id],
        color: options.hair.color[description.hair.color_id].name,
        length: `${description.hair.length.value} ${description.hair.length.unit}`,
      },
      face: {
        shape: options.face.shape[description.face.shape_id],
      },
      eyebrow: {
        color: options.eyebrow.color[description.eyebrow.color_id].name,
      },
      eye: {
        left: {
          color: options.definitions.eye.color[description.eye.left.color_id].name,
        },
        right: {
          color: options.definitions.eye.color[description.eye.right.color_id].name,
        },
      },
      hands: {
        nails: {
          color: options.hands.nails.color[description.hands.nails.color_id].name,
          length: `${description.hands.nails.length.value} ${description.hands.nails.length.unit}`,
        },
        hair: {
          color: options.hands.hair.color[description.hands.hair.color_id].name,
        },
      },
    },
  );
};

export const genders = () => (dispatch) => {
  dispatch(requestedProperty('genders'));
  options()
    .then(option => dispatch(receivedProperty('genders', option.general.gender)));
};

export const ethnicGroups = () => (dispatch) => {
  dispatch(requestedProperty('ethnicGroups'));
  options()
    .then((option) => {
      return dispatch(receivedProperty('ethnicGroups', option.general.ethnic_group));
    });
};

export const breastSizes = () => (dispatch) => {
  dispatch(requestedProperty('breastSizes'));
  options()
    .then((option) => {
      return dispatch(receivedProperty('breastSizes', option.body.breast_size));
    });
};

export const bodyBuilds = () => (dispatch) => {
  dispatch(requestedProperty('bodyBuilds'));
  options()
    .then((option) => {
      return dispatch(receivedProperty('bodyBuilds', option.body.build));
    });
};

export const hairStyles = () => (dispatch) => {
  dispatch(requestedProperty('hairStyles'));
  options()
    .then((option) => {
      return dispatch(receivedProperty('hairStyles', option.hair.style));
    });
};

export const lengthUnits = () => (dispatch) => {
  dispatch(requestedProperty('lengthUnits'));
  options()
    .then(option => dispatch(receivedProperty('lengthUnits', option.definitions.length_unit)));
};

export const shapes = () => (dispatch) => {
  dispatch(requestedProperty('shapes'));
  options()
    .then((option) => {
      return dispatch(receivedProperty('shapes', option.face.shape));
    });
};

export const ratings = () => (dispatch) => {
  dispatch(requestedProperty('ratings'));
  schema()
    .then(schema => dispatch(receivedProperty('ratings', schema.definitions.rating)));
};

export const hairColors = () => (dispatch) => {
  dispatch(requestedProperty('hairColors'));
  options()
    .then((option) => {
      return dispatch(receivedProperty(
        'hairColors',
        option.hair.color,
      ));
    });
};

export const beardColors = () => (dispatch) => {
  dispatch(requestedProperty('beardColors'));
  options()
    .then((option) => {
      return dispatch(receivedProperty(
        'beardColors',
        option.beard.color,
      ));
    });
};

export const eyebrowColors = () => (dispatch) => {
  dispatch(requestedProperty('eyebrowColors'));
  options()
    .then((option) => {
      return dispatch(receivedProperty(
        'eyebrowColors',
        option.eyebrow.color,
      ));
    });
};

export const eyeColors = () => (dispatch) => {
  dispatch(requestedProperty('eyeColors'));
  options()
    .then((option) => {
      return dispatch(receivedProperty(
        'eyeColors',
        option.definitions.eye.color,
      ));
    });
};

export const nailColors = () => (dispatch) => {
  dispatch(requestedProperty('nailColors'));
  options()
    .then((option) => {
      return dispatch(receivedProperty(
        'nailColors',
        option.hands.nails.color,
      ));
    });
};
