// @flow
import parse from 'parse-link-header';
import type { PaginationType } from './PaginationType';

export const fromHeader = (link: string): PaginationType => {
  const links = parse(link);
  return {
    page: parseInt(links.first.page, 10),
    perPage: parseInt(links.first.per_page, 10),
  };
};

const paginateWithReset = (perPage: number): PaginationType => ({
  page: 1,
  perPage,
});

export const withPerPage = (perPage: number, state: Object): Object => ({
  ...state,
  pagination: paginateWithReset(perPage),
});

export const withPage = (page: number, state: Object): Object => ({
  ...state,
  pagination: {
    ...state.pagination,
    page,
  },
});
