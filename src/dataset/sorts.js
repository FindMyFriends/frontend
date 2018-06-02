// @flow
import { SortType } from './SortType';

export const toggleSort = (sort: SortType): SortType => ({
  order: sort.order === 'asc' ? 'desc' : 'asc',
  orderBy: sort.orderBy,
});

export const toApiOrdering = (sort: SortType): string => {
  if (sort.order === 'asc') {
    return `+${sort.orderBy}`;
  }
  return `-${sort.orderBy}`;
};