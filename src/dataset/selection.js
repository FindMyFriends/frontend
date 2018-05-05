// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';

export const twoSideSort = (current: Object, added: Object): Object => {
  if (isEqual(Object.keys(current), Object.keys(added))) {
    const criteria = Object.keys(added)[0];
    const operator = current[criteria][0] === '+' ? '-' : '+';
    return { [criteria]: operator + criteria };
  }
  return mapValues(added, criteria => `+${criteria}`);
};

export const orderArrow = (sort: mixed, sorts: Object) => {
  if (Object.prototype.hasOwnProperty.call(sorts, sort)) {
    return (
      sorts[sort][0] === '+'
        ? <i className="material-icons">arrow_drop_up</i>
        : <i className="material-icons">arrow_drop_down</i>
    );
  }
  return null;
};

type SortColumnProps = {
  children: string,
  name: string,
  sorts: Object,
  onSort: (string) => mixed,
};
export const SortColumn = ({
  children,
  name,
  sorts,
  onSort,
}: SortColumnProps) => (
  <React.Fragment>
    <a href="#" onClick={() => onSort(name)}>
      <i className="material-icons">sort</i>
    </a>
    {children} {orderArrow(name, sorts)}
  </React.Fragment>
);
