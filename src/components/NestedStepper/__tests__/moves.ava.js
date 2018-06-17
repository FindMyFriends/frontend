import test from 'ava';
import { next, previous } from '../moves';

test('moving next', (assert) => {
  const parts = {
    0: { parts: [[], [], []] },
    1: { parts: [[], []] },
    2: { parts: [[]] },
  };
  assert.deepEqual({ major: 0, minor: 1 }, next({ major: 0, minor: 0 }, parts));
  assert.deepEqual({ major: 0, minor: 2 }, next({ major: 0, minor: 1 }, parts));
  assert.deepEqual({ major: 1, minor: 0 }, next({ major: 0, minor: 2 }, parts));
  assert.deepEqual({ major: 1, minor: 1 }, next({ major: 1, minor: 0 }, parts));
  assert.deepEqual({ major: 2, minor: 0 }, next({ major: 1, minor: 1 }, parts));
});

test('moving previous', (assert) => {
  const parts = {
    0: { parts: [[], [], []] },
    1: { parts: [[], []] },
    2: { parts: [[]] },
  };
  assert.deepEqual({ major: 1, minor: 1 }, previous({ major: 2, minor: 0 }, parts));
  assert.deepEqual({ major: 1, minor: 0 }, previous({ major: 1, minor: 1 }, parts));
  assert.deepEqual({ major: 0, minor: 2 }, previous({ major: 1, minor: 0 }, parts));
  assert.deepEqual({ major: 0, minor: 1 }, previous({ major: 0, minor: 2 }, parts));
  assert.deepEqual({ major: 0, minor: 0 }, previous({ major: 0, minor: 1 }, parts));
});
