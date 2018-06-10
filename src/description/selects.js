// @flow
import merge from 'lodash/merge';
import range from 'lodash/range';
import * as R from 'ramda';
import * as enumSet from '../api/enum';
import type { ApiEnum } from '../api/enum';

export const getSex = (options: ?Object): Array<string> => (options ? options.general.sex : []);
export const getEthnicGroups = (options: ?Object): Array<ApiEnum> => (
  options ? enumSet.toEnum(options.general.ethnic_group) : enumSet.empty()
);
export const getBodyBuilds = (options: ?Object): Array<ApiEnum> => (
  options ? enumSet.toEnum(options.body.build) : enumSet.empty()
);
export const getBreastSizes = (options: ?Object): Array<string> => (
  options ? options.body.breast_size : []
);
export const getHairStyles = (options: ?Object): Array<ApiEnum> => (
  options ? enumSet.toEnum(options.hair.style) : enumSet.empty()
);
export const getHairColors = (options: ?Object) => (
  options ? enumSet.toColorEnum(options.hair.color) : enumSet.emptyColor()
);
export const getRatings = (schema: ?Object): Array<number> => (
  schema
    ? range(schema.definitions.rating.minimum, schema.definitions.rating.maximum + 1)
    : enumSet.emptyRange()
);
export const getFaceShapes = (options: ?Object): Array<ApiEnum> => (
  options ? enumSet.toEnum(options.face.shape) : enumSet.empty()
);

export const getPrettyDescription = (description: Object, options: Object): Object => {
  if (R.isEmpty(description) || R.isEmpty(options)) {
    return { };
  }
  return merge(
    description,
    {
      general: {
        ethnic_group: options.general.ethnic_group[description.general.ethnic_group_id],
      },
      body: {
        build: options.body.build[description.body.build_id] || '',
        weight: `${description.body.weight.value || ''} ${description.body.weight.unit || ''}`,
        height: `${description.body.height.value || ''} ${description.body.height.unit || ''}`,
      },
      hair: {
        style: options.hair.style[description.hair.style_id] || '',
        color: options.hair.color[description.hair.color_id]
          ? options.hair.color[description.hair.color_id].name
          : null,
        length: `${description.hair.length.value || ''} ${description.hair.length.unit || ''}`,
      },
      face: {
        shape: options.face.shape[description.face.shape_id] || '',
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
          length: `${description.hands.nails.length.value || ''} ${description.hands.nails.length.unit || ''}`,
        },
        hair: {
          color: options.hands.hair.color[description.hands.hair.color_id]
            ? options.hands.hair.color[description.hands.hair.color_id].name
            : null,
        },
      },
    },
  );
};
