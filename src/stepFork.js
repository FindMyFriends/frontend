// @flow
export const previousStep = (step: Object, allSteps: Object): Object => {
  const { major, minor } = step;
  if (allSteps[major].parts[minor - 1]) {
    return { step: { major, minor: minor - 1 } };
  } else if (allSteps[major - 1] && allSteps[major - 1].parts[minor]) {
    return {
      step: {
        major: major - 1,
        minor: Math.max(...Object.keys(allSteps[major - 1].parts)),
      },
    };
  }
  return { step };
};

export const nextStep = (step: Object, allSteps: Object): Object => {
  const { major, minor } = { major: parseInt(step.major, 10), minor: parseInt(step.minor, 10) };
  if (allSteps[major].parts[minor + 1]) {
    return { step: { major, minor: minor + 1 } };
  } else if (allSteps[major + 1] && allSteps[major + 1].parts[minor]) {
    return { step: { major: major + 1, minor } };
  }
  return { step: { major: major + 1, minor: 0 } };
};

export const isLastStep = (step: Object, allSteps: Object): boolean => {
  const typedStep = { major: parseInt(step.major, 10), minor: parseInt(step.minor, 10) };
  const { step: { major } } = nextStep(typedStep, allSteps);
  return allSteps[major] === undefined;
};
