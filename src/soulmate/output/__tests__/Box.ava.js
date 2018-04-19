import React from 'react';
import test from 'ava';
import { orderArrow } from './../Box';

test('no arrow for not matching sort criteria', (t) => {
  t.deepEqual(
    null,
    orderArrow(
      'position',
      { ownership: '+ownership' },
    ),
  );
});

test('up arrow for +', (t) => {
  t.deepEqual(
    <i className="material-icons">arrow_drop_up</i>,
    orderArrow(
      'ownership',
      { ownership: '+ownership' },
    ),
  );
});

test('down arrow for -', (t) => {
  t.deepEqual(
    <i className="material-icons">arrow_drop_down</i>,
    orderArrow(
      'ownership',
      { ownership: '-ownership' },
    ),
  );
});
