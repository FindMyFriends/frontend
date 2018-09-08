// @flow
import type { PaginationType } from './PaginationType';
import type { SortType } from './SortType';

export const RECEIVED_SORTING = 'RECEIVED_SORTING';
export const RECEIVED_PAGINATION = 'RECEIVED_PAGINATION';
export const RECEIVED_INIT_SORTING_AND_PAGING = 'RECEIVED_INIT_SORTING_AND_PAGING';

const toggle = (sort: SortType, orderBy: string): SortType => {
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

export const receivedPagination = (source: string, pagination: PaginationType) => ({
  type: RECEIVED_PAGINATION,
  source,
  pagination,
});

export const receivedSorting = (source: string, sorting: SortType) => ({
  type: RECEIVED_SORTING,
  source,
  sorting,
});

export const receivedInit = (source: string, sorting: SortType, pagination: PaginationType) => ({
  type: RECEIVED_INIT_SORTING_AND_PAGING,
  source,
  sorting,
  pagination,
});

export const sort = (source: string, orderBy: string, current: SortType) => (
  receivedSorting(source, toggle(current, orderBy))
);

export const turnPage = (source: string, page: number, current: PaginationType) => (
  receivedPagination(source, { page, perPage: current.perPage })
);

export const changePerPage = (source: string, perPage: number, current: PaginationType) => (
  receivedPagination(source, { perPage, page: current.page })
);
