// @flow
type OrderType = 'asc' | 'desc';

export type SortType = {|
  +order: OrderType,
  +orderBy: string,
|};
