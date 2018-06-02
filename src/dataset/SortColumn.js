// @flow
import * as React from 'react';
import Sort from '@material-ui/icons/Sort';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

type OrderArrowProps = {|
  +children: number | string,
  +sorts: Object,
|};
const OrderArrow = ({ children, sorts }: OrderArrowProps) => {
  if (Object.prototype.hasOwnProperty.call(sorts, children)) {
    return (
      sorts[children][0] === '+'
        ? <ArrowDropUpIcon />
        : <ArrowDropDownIcon />
    );
  }
  return null;
};

type SortColumnProps = {|
  +children: string,
  +name: string,
  +sorts: Object,
  +onSort: (string) => mixed,
|};
const SortColumn = ({ children, name, sorts, onSort }: SortColumnProps) => (
  <React.Fragment>
    <Sort style={{ cursor: 'pointer' }} onClick={() => onSort(name)} />
    {children}
    <OrderArrow sorts={sorts}>{name}</OrderArrow>
  </React.Fragment>
);

export default SortColumn;
