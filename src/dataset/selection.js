// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';
import ArrowDropUpIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SortIcon from 'material-ui/svg-icons/content/sort';

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
        ? <ArrowDropUpIcon />
        : <ArrowDropDownIcon />
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
    <SortIcon style={{ cursor: 'pointer' }} onClick={() => onSort(name)} />
    {children} {orderArrow(name, sorts)}
  </React.Fragment>
);
