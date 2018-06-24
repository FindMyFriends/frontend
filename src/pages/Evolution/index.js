// @flow
import React from 'react';
import { connect } from 'react-redux';
import { single, options } from '../../evolution/endpoints';
import { EVOLUTION } from '../../evolution/actions';
import Loader from '../../ui/Loader';
import Overview from '../../description/output/Overview';
import { getPrettyEvolution } from '../../evolution/reducers';
import { getScopeOptions, isFetching } from '../../schema/reducers';

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
    const { evolution, fetching } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return <Overview description={evolution} />;
  }
}

const mapStateToProps = state => ({
  evolution: getPrettyEvolution(state.evolution.single, getScopeOptions(state, EVOLUTION)),
  fetching: state.evolution.fetching || isFetching(state, EVOLUTION),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  single: (id: string) => dispatch(single(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Evolution);
