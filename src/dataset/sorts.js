// @flow
import type { SortType } from './SortType';
import type { PaginationType } from "./PaginationType";

export const toggleSort = (sort: SortType, orderBy: string): SortType => {
  if (sort.orderBy === orderBy) {
    return {
      order: sort.order === 'asc' ? 'desc' : 'asc',
      orderBy: sort.orderBy,
    };
  }
  return {
    order: 'asc',
    orderBy,
  };
};

export const toApiOrdering = (sort: SortType): string => {
  if (sort.order === 'asc') {
    return `+${sort.orderBy}`;
  }
  return `-${sort.orderBy}`;
};

type sortWithResetType = {
  +sort: SortType,
  +pagination: PaginationType,
};
export const sortWithReset = (sort: SortType, column: string, pagination: PaginationType): sortWithResetType => {
  return {
    sort: toggleSort(sort, column),
    pagination: {
      page: 1,
      perPage: pagination.perPage,
    }
  }
};
