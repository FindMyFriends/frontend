// @flow
import React from 'react';
import { connect } from 'react-redux';
import { all, markAs } from '../../../soulmate/endpoints';
import Loader from '../../../ui/Loader';
import { default as Tabs, SOULMATES_TYPE } from '../menu/Tabs';
import type { PaginationType } from '../../../dataset/PaginationType';
import type { SortType } from '../../../dataset/SortType';
import Table from '../../../soulmate/output/Table';
import { toApiOrdering, withSort } from '../../../dataset/sorts';
import { withPage, withPerPage } from '../../../dataset/pagination';

type Props = {|
  +soulmates: Array<Object>,
  +total: number,
  +fetching: boolean,
  +all: (string, SortType, PaginationType) => (void),
  +markAs: (string, boolean, () => (void)) => (void),
  +match: Object,
|};
type State = {|
  pagination: PaginationType,
  sort: SortType,
|};
class Soulmates extends React.Component<Props, State> {
  state = {
    sort: {
      order: 'desc',
      orderBy: 'related_at',
    },
    pagination: {
      page: 1,
      perPage: 5,
    },
  };

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    const { sort, pagination } = this.state;
    this.props.all(this.props.match.params.id, sort, pagination);
  };

  handleSort = (column: string) => this.setState(withSort(column, this.state), this.reload);

  handleChangePerPage = (perPage: number) => this.setState(
    withPerPage(perPage, this.state),
    this.reload,
  );

  handleChangePage = (page: number) => this.setState(
    withPage(page, this.state),
    this.reload,
  );

  handleMarkAs = (id: string, as: boolean) => this.props.markAs(
    id,
    as,
    this.reload,
  );

  render() {
    const { sort, pagination } = this.state;
    const {
      soulmates,
      total,
      fetching,
      match: { params: { id } },
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Tabs type={SOULMATES_TYPE} id={id} soulmateTotal={total} />
        <Table
          rows={soulmates}
          sort={sort}
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

const mapStateToProps = state => ({
  soulmates: state.soulmate.all.payload || [],
  total: state.soulmate.total || 0,
  fetching: state.soulmate.fetching,
});
const mapDispatchToProps = dispatch => ({
  all: (
    id: string,
    sort: SortType,
    pagination: PaginationType,
  ) => dispatch(all(id, [toApiOrdering(sort)], pagination)),
  markAs: (
    soulmate: string,
    as: boolean,
    next: () => (void),
  ) => dispatch(markAs(soulmate, as, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Soulmates);
