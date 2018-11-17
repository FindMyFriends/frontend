// @flow
import React from 'react';
import { connect } from 'react-redux';
import { all, info, markAs } from '../../../soulmate/endpoints';
import { getAllByDemand, getTotal, singleFetching as soulmateFetching, singleInfoFetching as soulmateSingleFetching } from '../../../soulmate/selects';
import Loader from '../../../ui/Loader';
import { default as Tabs, SOULMATES_TYPE } from '../menu/Tabs';
import type { PaginationType } from '../../../dataset/PaginationType';
import type { SortType } from '../../../dataset/SortType';
import Table from '../../../soulmate/output/Table';
import { toApiOrdering } from '../../../dataset/formats';
import { getSourcePagination, getSourceSorting } from '../../../dataset/selects';
import {
  changePerPage,
  receivedInit,
  sort,
  turnPage,
} from '../../../dataset/actions';

type Props = {|
  +soulmates: Array<Object>,
  +total: number,
  +fetching: boolean,
  +all: (string, SortType, PaginationType) => (void),
  +markAs: (string, boolean, () => (void)) => (void),
  +match: Object,
  +sorting: SortType,
  +sort: (string, SortType) => (void),
  +turnPage: (number, PaginationType) => (void),
  +changePerPage: (number, PaginationType) => (void),
  +initSortAndPaging: (SortType, PaginationType) => (void),
  +pagination: PaginationType,
|};
type State = {|
  pagination: PaginationType,
  sort: SortType,
|};
class All extends React.Component<Props, State> {
  componentDidMount = () => {
    Promise.resolve()
      .then(() => this.props.initSortAndPaging({ order: 'desc', orderBy: 'related_at' }, { page: 1, perPage: 5 }))
      .then(this.reload);
  };

  reload = () => {
    const {
      sorting,
      pagination,
      match: { params: { id } },
    } = this.props;
    this.props.all(id, sorting, pagination);
  };

  handleSort = (orderBy: string) => (
    Promise.resolve()
      .then(() => this.props.sort(orderBy, this.props.sorting))
      .then(this.reload)
  );

  handleChangePerPage = (perPage: number) => (
    Promise.resolve()
      .then(() => this.props.changePerPage(perPage, this.props.pagination))
      .then(this.reload)
  );

  handleChangePage = (page: number) => (
    Promise.resolve()
      .then(() => this.props.turnPage(page, this.props.pagination))
      .then(this.reload)
  );

  handleMarkAs = (id: string, as: boolean) => this.props.markAs(
    id,
    as,
    this.reload,
  );

  render() {
    const {
      soulmates,
      total,
      fetching,
      match: { params: { id } },
      sorting,
      pagination,
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    console.log(this.props);
    return (
      <React.Fragment>
        <Tabs type={SOULMATES_TYPE} id={id} soulmateTotal={total} />
        <Table
          rows={soulmates}
          sort={sorting}
          pagination={pagination}
          total={total}
          onMarkAs={(id, as) => this.handleMarkAs(id, as)}
          onSort={column => this.handleSort(column)}
          onPageChange={page => this.handleChangePage(page)}
          onPerPageChange={perPage => this.handleChangePerPage(perPage)}
        />
      </React.Fragment>
    );
  }
}

const SOURCE_NAME = 'demand/soulmates';

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  soulmates: getAllByDemand(id, state),
  total: getTotal(id, state),
  fetching: soulmateFetching(id, state) || soulmateSingleFetching(id, state),
  sorting: getSourceSorting(SOURCE_NAME, state),
  pagination: getSourcePagination(SOURCE_NAME, state),
});
const mapDispatchToProps = dispatch => ({
  all: (
    id: string,
    sort: SortType,
    pagination: PaginationType,
  ) => Promise.resolve().then(() => dispatch(all(id, [toApiOrdering(sort)], pagination))).then(dispatch(info(id))),
  markAs: (
    soulmate: string,
    as: boolean,
    next: () => (void),
  ) => dispatch(markAs(soulmate, as, next)),
  sort: (orderBy: string, current: SortType) => dispatch(sort(SOURCE_NAME, orderBy, current)),
  turnPage: (
    page: number,
    current: PaginationType,
  ) => dispatch(turnPage(SOURCE_NAME, page, current)),
  changePerPage: (
    perPage: number,
    current: PaginationType,
  ) => dispatch(changePerPage(SOURCE_NAME, perPage, current)),
  initSortAndPaging: (
    sorting: SortType,
    paging: PaginationType,
  ) => dispatch(receivedInit(SOURCE_NAME, sorting, paging)),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
