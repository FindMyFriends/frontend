// @flow
import React from 'react';
import { connect } from 'react-redux';
import { single, options, getScopeOptions } from '../../evolution/endpoints';
import { EVOLUTION } from '../../evolution/actions';
import Loader from '../../ui/Loader';
import Overview from '../../evolution/output/Overview';
import { getById, getPrettyEvolution, singleFetching as fetchingEvolution } from '../../evolution/selects';
import { isFetching } from '../../schema/selects';
import { default as Tabs, EVOLUTION_TYPE } from './menu/Tabs';

type Props = {|
  +evolution: Object,
  +fetching: boolean,
  +single: (string) => (void),
  +options: () => (void),
  +match: Object,
|};
class Evolution extends React.Component<Props, any> {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.options();
    this.props.single(id);
  }

  render() {
    const { evolution, fetching, match: { params: { id } } } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Tabs type={EVOLUTION_TYPE} id={id} />
        <Overview evolution={evolution} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  evolution: getPrettyEvolution(getById(id, state), getScopeOptions(state)),
  fetching: fetchingEvolution(id, state) || isFetching(state, EVOLUTION),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  single: (id: string) => dispatch(single(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Evolution);
