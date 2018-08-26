import test from 'ava';
import { getSpotsWithoutDemand } from '../selects';

test('picking by demand_id', (assert) => {
  const spots = {
    0: { demand_id: 'abc', id: 10 },
    1: { demand_id: 'def', id: 11 },
    2: { demand_id: 'def', id: 11 },
    3: { demand_id: 'xyz', id: 12 },
  };
  assert.deepEqual(
    {
      0: { demand_id: 'abc', id: 10 },
      3: { demand_id: 'xyz', id: 12 },
    },
    getSpotsWithoutDemand(spots, 'def'),
  );
});
