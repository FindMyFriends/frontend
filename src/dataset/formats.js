// @flow
import type { SortType } from './SortType';

export const toApiOrdering = (sort: SortType): string => {
  if (sort.order === 'asc') {
    return `+${sort.orderBy}`;
  }
  return `-${sort.orderBy}`;
};
