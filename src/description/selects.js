// @flow
import { merge, isEmpty } from 'lodash';
import * as enumSet from '../api/enum';
import type { ApiEnum, ApiColor, ApiRange } from '../api/enum';

export const getSex = (options: Object): Array<string> => (
  !isEmpty(options) ? options.general.sex : []
);
export const getEthnicGroups = (options: Object): Array<ApiEnum> => (
  !isEmpty(options) ? enumSet.toEnum(options.general.ethnic_group) : enumSet.empty()
);
export const getBodyBuilds = (options: Object): Array<ApiEnum> => (
  !isEmpty(options) ? enumSet.toEnum(options.body.build) : enumSet.empty()
);
export const getBreastSizes = (options: Object): Array<string> => (
  !isEmpty(options) ? options.body.breast_size : []
);
export const getHairStyles = (options: Object): Array<ApiEnum> => (
  !isEmpty(options) ? enumSet.toEnum(options.hair.style) : enumSet.empty()
);
export const getHairLengths = (options: Object): Array<ApiEnum> => (
  !isEmpty(options) ? enumSet.toEnum(options.hair.length) : enumSet.empty()
);
export const getBeardLengths = (options: Object): Array<ApiEnum> => (
  !isEmpty(options) ? enumSet.toEnum(options.beard.length) : enumSet.empty()
);
export const getBeardStyles = (options: Object): Array<ApiEnum> => (
  !isEmpty(options) ? enumSet.toEnum(options.beard.style) : enumSet.empty()
);
export const getHairColors = (options: Object): Array<ApiColor> => (
  !isEmpty(options) ? enumSet.toColorEnum(options.hair.color) : enumSet.emptyColor()
);
export const getBeardColors = (options: Object): Array<ApiColor> => (
  !isEmpty(options) ? enumSet.toColorEnum(options.beard.color) : enumSet.emptyColor()
);
export const getEyebrowColors = (options: Object): Array<ApiColor> => (
  !isEmpty(options) ? enumSet.toColorEnum(options.eyebrow.color) : enumSet.emptyColor()
);
export const getEyeColors = (options: Object): Array<ApiColor> => (
  !isEmpty(options) ? enumSet.toColorEnum(options.definitions.eye.color) : enumSet.emptyColor()
);
export const getNailsColors = (options: Object): Array<ApiColor> => (
  !isEmpty(options) ? enumSet.toColorEnum(options.hands.nails.color) : enumSet.emptyColor()
);
export const getFaceShapes = (options: Object): Array<ApiEnum> => (
  !isEmpty(options) ? enumSet.toEnum(options.face.shape) : enumSet.empty()
);
export const getAge = (schema: Object): ApiRange => (
  !isEmpty(schema)
    ? enumSet.toRange(schema.definitions.age)
    : enumSet.emptyRange()
);

export const getPrettyDescription = (description: Object, options: Object): Object => {
  if (isEmpty(description) || isEmpty(options)) {
    return { };
  }
  return merge(
    {},
    description,
    {
      general: {
        ethnic_group: options.general.ethnic_group[description.general.ethnic_group_id]
          ? options.general.ethnic_group[description.general.ethnic_group_id].name
          : null,
      },
      body: {
        build: options.body.build[description.body.build_id]
          ? options.body.build[description.body.build_id].name
          : null,
      },
      hair: {
        style: options.hair.style[description.hair.style_id]
          ? options.hair.style[description.hair.style_id].name
          : null,
        color: options.hair.color[description.hair.color_id]
          ? options.hair.color[description.hair.color_id].name
          : null,
        length: options.hair.length[description.hair.length_id]
          ? options.hair.length[description.hair.length_id].name
          : null,
      },
      beard: {
        length: options.beard.length[description.beard.length_id]
          ? options.beard.length[description.beard.length_id].name
          : null,
        style: options.beard.style[description.beard.style_id]
          ? options.beard.style[description.beard.style_id].name
          : null,
      },
      face: {
        shape: options.face.shape[description.face.shape_id]
          ? options.face.shape[description.face.shape_id].name
          : null,
      },
      eyebrow: {
        color: options.eyebrow.color[description.eyebrow.color_id]
          ? options.eyebrow.color[description.eyebrow.color_id].name
          : null,
      },
      eye: {
        left: {
          color: options.definitions.eye.color[description.eye.left.color_id]
            ? options.definitions.eye.color[description.eye.left.color_id].name
            : null,
        },
        right: {
          color: options.definitions.eye.color[description.eye.right.color_id]
            ? options.definitions.eye.color[description.eye.right.color_id].name
            : null,
        },
      },
      hands: {
        nails: {
          color: options.hands.nails.color[description.hands.nails.color_id]
            ? options.hands.nails.color[description.hands.nails.color_id].name
            : null,
          length: options.hands.nails.length[description.hands.nails.length_id]
            ? options.hands.nails.length[description.hands.nails.length_id].name
            : null,
        },
      },
    },
  );
};
