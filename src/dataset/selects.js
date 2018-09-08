// @flow
import type { SortType } from './SortType';
import type { PaginationType } from './PaginationType';

export const getSourceSorting = (
  source: string,
  state: Object,
): ?SortType => (
  state.dataset[source] ? state.dataset[source].sorting : null
);

export const getSourcePagination = (
  source: string,
  state: Object,
): ?PaginationType => (
  state.dataset[source] ? state.dataset[source].pagination : null
);
