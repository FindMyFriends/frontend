import test from 'ava';
import { nextStep, previousStep, isLastStep } from '../../../components/stepFork';

test('going to minor', (t) => {
  const allParts = { 1: { parts: { 1: [], 2: [], 3: [] } } };
  t.deepEqual(
    {
      step: {
        major: 1,
        minor: 2,
      },
    },
    nextStep({ major: 1, minor: 1 }, allParts),
  );
  t.deepEqual(
    {
      step: {
        major: 1,
        minor: 2,
      },
    },
    previousStep({ major: 1, minor: 3 }, allParts),
  );
});

test('going only to majors', (t) => {
  const allParts = { 1: { parts: { 1: [] } }, 2: { parts: { 1: [] } } };
  t.deepEqual(
    {
      step: {
        major: 2,
        minor: 1,
      },
    },
    nextStep({ major: 1, minor: 1 }, allParts),
  );
  t.deepEqual(
    {
      step: {
        major: 1,
        minor: 1,
      },
    },
    previousStep({ major: 2, minor: 1 }, allParts),
  );
});

test('majors as integers', (t) => {
  const allParts = { 1: { parts: { 1: [] } }, 2: { parts: { 1: [] } } };
  t.deepEqual(
    {
      step: {
        major: 2,
        minor: 1,
      },
    },
    nextStep({ major: '1', minor: 1 }, allParts),
  );
});

test('minors, then majors', (t) => {
  const allParts = { 1: { parts: { 1: [], 2: [], 3: [] } }, 2: { parts: { 1: [] } } };
  t.deepEqual(
    {
      step: {
        major: 2,
        minor: 0,
      },
    },
    nextStep({ major: 1, minor: 3 }, allParts),
  );
  t.deepEqual(
    {
      step: {
        major: 1,
        minor: 3,
      },
    },
    previousStep({ major: 2, minor: 1 }, allParts),
  );
});

test('checking last step', (t) => {
  const allParts = { 1: { parts: [{}, {}, {}] }, 2: { parts: [{}] }, 3: { parts: [{}, {}] } };
  t.deepEqual(false, isLastStep({ major: 1, minor: 2 }, allParts));
  t.deepEqual(false, isLastStep({ major: 2, minor: 0 }, allParts));
  t.deepEqual(false, isLastStep({ major: 3, minor: 0 }, allParts));
  t.deepEqual(true, isLastStep({ major: 3, minor: 1 }, allParts));
});

test('checking last step with string keys', (t) => {
  const allParts = { 1: { parts: [{}, {}, {}] }, 2: { parts: [{}] }, 3: { parts: [{}, {}] } };
  t.deepEqual(false, isLastStep({ major: '1', minor: 2 }, allParts));
  t.deepEqual(false, isLastStep({ major: '2', minor: 0 }, allParts));
  t.deepEqual(false, isLastStep({ major: '3', minor: 0 }, allParts));
  t.deepEqual(true, isLastStep({ major: '3', minor: 1 }, allParts));
});
