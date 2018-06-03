// @flow
type OrderBy = 'asc' | 'desc';
export type SortType = {|
  +order: string,
  +orderBy: OrderBy,
|};