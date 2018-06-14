// @flow

type unitValueType = {|
  +unit: ?string,
  +value: ?number,
|};
const normalizeUnitValue = (unitValue: unitValueType): unitValueType => {
  if (unitValue.value === null) {
    return {
      unit: null,
      value: null,
    };
  }
  return unitValue;
};

export default function normalize(description: Object): Object {
  const normalization = description;
  normalization.body.height = normalizeUnitValue(normalization.body.height);
  normalization.body.weight = normalizeUnitValue(normalization.body.weight);
  normalization.hair.length = normalizeUnitValue(normalization.hair.length);
  normalization.beard.length = normalizeUnitValue(normalization.beard.length);
  normalization.hands.nails.length = normalizeUnitValue(normalization.hands.nails.length);
  return normalization;
}
