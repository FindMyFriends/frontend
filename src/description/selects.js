// @flow
import { merge, isEmpty } from 'lodash';
import * as enumSet from '../api/enum';
import type { ApiEnum, ApiColor } from '../api/enum';

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
export const getHairColors = (options: ?Object): Array<ApiColor> => (
  options ? enumSet.toColorEnum(options.hair.color) : enumSet.emptyColor()
);
export const getBeardColors = (options: ?Object): Array<ApiColor> => (
  options ? enumSet.toColorEnum(options.beard.color) : enumSet.emptyColor()
);
export const getEyebrowColors = (options: ?Object): Array<ApiColor> => (
  options ? enumSet.toColorEnum(options.eyebrow.color) : enumSet.emptyColor()
);
export const getEyeColors = (options: ?Object): Array<ApiColor> => (
  options ? enumSet.toColorEnum(options.definitions.eye.color) : enumSet.emptyColor()
);
export const getNailsColors = (options: ?Object): Array<ApiColor> => (
  options ? enumSet.toColorEnum(options.hands.nails.color) : enumSet.emptyColor()
);
export const getHandHairColors = (options: ?Object): Array<ApiColor> => (
  options ? enumSet.toColorEnum(options.hands.hair.color) : enumSet.emptyColor()
);
export const getFaceShapes = (options: ?Object): Array<ApiEnum> => (
  options ? enumSet.toEnum(options.face.shape) : enumSet.empty()
);

type UnitValue = {|
  +unit: ?string,
  +value: ?number,
|};
const formattedUnitValue = (unitValue: UnitValue): string => `${unitValue.value || ''} ${unitValue.unit || ''}`;

type Age = {|
  +from: number,
  +to: number,
|};
const formattedAge = (age: Age): string => `${age.from} - ${age.to}`;

// TODO: Rename and include key
export const guessedFormatting = (value: Object | string): Object | string => {
  if (typeof value === 'object') {
    if ('value' in value && 'unit' in value) {
      return formattedUnitValue(value);
    } else if ('from' in value && 'to' in value) {
      return formattedAge(value);
    }
  }
  return value;
};

export const translatedField = (field: string): string => {
  const possibilities = {
    'general.firstname': 'Firstname',
    'general.lastname': 'Lastname',
    'general.sex': 'Sex',
  };
  if (field in possibilities) {
    return possibilities[field];
  }
  return field;
};

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
        weight: formattedUnitValue(description.body.weight),
        height: formattedUnitValue(description.body.height),
      },
      hair: {
        style: options.hair.style[description.hair.style_id]
          ? options.hair.style[description.hair.style_id].name
          : null,
        color: options.hair.color[description.hair.color_id]
          ? options.hair.color[description.hair.color_id].name
          : null,
        length: formattedUnitValue(description.hair.length),
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
          length: formattedUnitValue(description.hands.nails.length),
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
