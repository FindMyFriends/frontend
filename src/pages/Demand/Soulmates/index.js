// @flow
import React from 'react';
import { connect } from 'react-redux';
import { all } from '../../../soulmate/endpoints';
import Loader from '../../../ui/Loader';
import { default as Tabs, SOULMATES_TYPE } from '../menu/Tabs';
import type { PaginationType } from '../../../dataset/PaginationType';
import type { SortType } from '../../../dataset/SortType';
import Table from '../../../soulmate/output/Table';
import { toApiOrdering } from '../../../dataset/sorts';
import { withPage, withPerPage } from '../../../dataset/pagination';

type Props = {|
  +soulmates: Array<Object>,
  +total: number,
  +fetching: boolean,
  +all: (id: string) => (void),
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
      orderBy: 'searched_at',
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

  handleChangePerPage = (perPage: number) => this.setState(
    withPerPage(perPage, this.state),
    this.reload,
  );
  handleChangePage = (page: number) => this.setState(
    withPage(page, this.state),
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
          onSort={column => this.handleSort(column)}
          onPageChange={page => this.handleChangePage(page)}
          onPerPageChange={perPage => this.handleChangePerPage(perPage)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  soulmates: state.soulmate.all,
  total: state.soulmate.total,
  fetching: state.soulmate.fetching,
});
const mapDispatchToProps = dispatch => ({
  all: (
    id: string,
    sort: SortType,
    pagination: PaginationType,
  ) => dispatch(all(id, [toApiOrdering(sort)], pagination)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Soulmates);
