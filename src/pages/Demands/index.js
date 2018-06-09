// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Table from './../../demand/output/Table';
import { all, saveNote, retract } from '../../demand/endpoints';
import { toApiOrdering, withSort } from './../../dataset/sorts';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import { withPage, withPerPage } from '../../dataset/pagination';
import Loader from '../../ui/Loader';
import { requestedConfirm } from '../../ui/actions';

const BottomRightNavigation = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
`;

type Props = {|
  +demands: Array<Object>,
  +all: (SortType, PaginationType) => (void),
  +total: number,
  +fetching: boolean,
  +saveNote: (id: string, text: string, next: () => (mixed)) => (void),
  +retract: (id: string, next: () => (void)) => (void),
  +requestedConfirm: (content: string, action: () => (void)) => (void),
|};
type State = {|
  sort: SortType,
  pagination: PaginationType,
|};
class All extends React.Component<Props, State> {
  state = {
    sort: {
      order: 'desc',
      orderBy: 'created_at',
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
    this.props.all(sort, pagination);
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

  handleNoteSave = (id: string, note: string, next: () => (any)) => {
    this.props.saveNote(
      id,
      note,
      () => Promise.resolve().then(next).then(this.reload),
    );
  };

  handleRetract = (id: string) => {
    this.props.requestedConfirm(
      'Are you sure, you want to retract demand?',
      () => this.props.retract(id, this.reload),
    );
  };

  render() {
    const { sort, pagination } = this.state;
    const { demands, total, fetching } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Table
          rows={demands}
          sort={sort}
          pagination={pagination}
          total={total}
          onNoteSave={this.handleNoteSave}
          onSort={column => this.handleSort(column)}
          onPageChange={page => this.handleChangePage(page)}
          onPerPageChange={perPage => this.handleChangePerPage(perPage)}
          onRetract={this.handleRetract}
        />
        <BottomRightNavigation>
          <Link to="/demands/add">
            <Button variant="fab" color="primary" aria-label="add">
              <AddIcon />
            </Button>
          </Link>
        </BottomRightNavigation>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  demands: state.demand.all || [],
  total: state.demand.total || 0,
  pagination: state.demand.pagination,
  fetching: state.demand.fetching,
});
const mapDispatchToProps = dispatch => ({
  all: (
    sort: SortType,
    pagination: PaginationType,
  ) => dispatch(all([toApiOrdering(sort)], pagination)),
  saveNote: (id: string, text: string, next: Promise<any>) => dispatch(saveNote(id, text, next)),
  retract: (id: string, next: () => (void)) => dispatch(retract(id, next)),
  requestedConfirm: (
    content: string,
    action: () => (void),
  ) => dispatch(requestedConfirm(content, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
