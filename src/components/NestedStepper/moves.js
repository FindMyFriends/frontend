// @flow

export type Step = {|
  +major: number,
  +minor: number,
|};

const min = (parts: Object) => Math.min(...Object.keys(parts).map(step => parseInt(step, 10)));
const max = (parts: Object) => Math.max(...Object.keys(parts).map(step => parseInt(step, 10)));
const increment = (step: number) => step + 1;
const decrement = (step: number) => step - 1;

export const next = (current: Step, steps: Object): Step => {
  if (increment(current.minor) > max(steps[current.major].parts)) {
    return {
      minor: 0,
      major: increment(current.major),
    };
  }
  return {
    ...current,
    minor: increment(current.minor),
  };
};

export const previous = (current: Step, steps: Object): Step => {
  if (decrement(current.minor) < min(steps[current.major].parts)) {
    return {
      minor: max(steps[decrement(current.major)].parts),
      major: decrement(current.major),
    };
  }
  return {
    ...current,
    minor: decrement(current.minor),
  };
};

export const isFirst = (current: Step): boolean => current.major === 0 && current.minor === 0;

export const isLast = (current: Step, steps: Object): boolean => (
  max(steps[current.major].parts) === current.minor && max(steps) === current.major
);
