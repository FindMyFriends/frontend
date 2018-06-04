// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Table from './../../demand/output/Table';
import { single } from './../../demand/endpoints';
import { toApiOrdering, sortWithReset } from './../../dataset/sorts';
import type { PaginationType } from './../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import { paginateWithReset } from '../../dataset/pagination';
import Loader from './../../ui/Loader';
import { requestedConfirm } from '../../ui/actions';

type Props = {|
  +demand: Object,
  +fetching: boolean,
  +single: (id: string) => (void),
  +match: Object,
|};
class Single extends React.Component<Props, any> {
  componentDidMount() {
    this.props.single(this.props.match.params.id);
  }

  render() {
    const { demand, fetching } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      ''
    );
  }
}

const mapStateToProps = state => ({
  demand: state.demand.single || {},
  fetching: state.demand.fetching || state.schema.fetching,
});
const mapDispatchToProps = dispatch => ({
  single: (id: string) => dispatch(single(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Single);
