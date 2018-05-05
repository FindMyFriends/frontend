import React from 'react';
import test from 'ava';
import ArrowDropUpIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import { twoSideSort, orderArrow } from './../selection';

test('adding first with +', (t) => {
  t.deepEqual(
    {
      position: '+position',
    },
    twoSideSort(
      { },
      { position: 'position' },
    ),
  );
});

test('rewriting', (t) => {
  t.deepEqual(
    {
      position: '+position',
    },
    twoSideSort(
      { foo: 'bar' },
      { position: 'position' },
    ),
  );
});

test('changing side from - to +', (t) => {
  t.deepEqual(
    {
      position: '+position',
    },
    twoSideSort(
      { position: '-position' },
      { position: 'position' },
    ),
  );
  t.deepEqual(
    {
      position: '-position',
    },
    twoSideSort(
      { position: '+position' },
      { position: 'position' },
    ),
  );
});

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
    <ArrowDropUpIcon />,
    orderArrow(
      'ownership',
      { ownership: '+ownership' },
    ),
  );
});

test('down arrow for -', (t) => {
  t.deepEqual(
    <ArrowDropDownIcon />,
    orderArrow(
      'ownership',
      { ownership: '-ownership' },
    ),
  );
});
