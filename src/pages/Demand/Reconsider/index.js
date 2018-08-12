// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten, unflatten } from 'flat';
import merge from 'lodash/merge';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { isFetching, getScopeOptions } from '../../../schema/reducers';
import { DEMAND } from '../../../demand/actions';
import { reconsider, single, options, schema } from '../../../demand/endpoints';
import { history as spotHistory } from '../../../demand/spot/endpoints';
import normalize from '../../../description/input/normalize';
import {
  getBodyBuilds,
  getBreastSizes,
  getHairStyles,
  getEthnicGroups,
  getSex,
  getHairColors,
  getFaceShapes,
  getBeardColors,
  getEyebrowColors,
  getEyeColors,
  getNailsColors,
  getHandHairColors,
} from '../../../description/selects';
import steps from '../../../demand/input/parts/steps';
import { getTimelineSides } from '../../../demand/selects';
import { spotsFetching, getSpotsByDemand } from '../../../spot/reducers';
import { singleFetching as demandFetching } from '../../../demand/reducers';

type Props = {|
  +reconsider: (string, Object, string, (string) => (void)) => (void),
  +single: (string, (Object) => (void)) => (void),
  +spotHistory: (string, (Object) => (void)) => (void),
  +schema: () => (void),
  +options: () => (void),
  +fetching: boolean,
  +history: Object,
  +match: Object,
  +demand: Object,
  +spots: Array<Object>,
  +etags: Object,
|};
type State = {|
  demand: Object,
|};
class Extend extends React.Component<Props, State> {
  state = {
    demand: {},
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.options();
    this.props.schema();
    Promise.resolve()
      .then(() => this.props.single(
        id,
        () => this.setState({ demand: this.props.demand }),
      ))
      .then(() => this.props.spotHistory(
        id,
        () => this.setState({ demand: { ...this.state.demand, spots: this.props.spots } }),
      ));
  }

  // TODO: Move - common with demand
  handleChange = name => event => (
    this.setState({
      demand: {
        ...merge(
          this.state.demand,
          unflatten({
            [name]: event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value,
          }),
        ),
      },
    })
  );

  handleReconsider = () => (
    this.props.reconsider(
      this.state.demand.id,
      normalize(this.state.demand),
      this.props.etags.demand,
      () => this.props.history.push(`/demands/${this.state.demand.id}`),
    )
  );

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }
    return (
      <NestedStepper
        onAdd={this.handleReconsider}
        steps={
          steps({
            ...this.props,
            onChange: this.handleChange,
            values: flatten(this.state.demand),
          })
        }
      />
    );
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => {
  return {
    spots: getSpotsByDemand(state, state.demand.single.payload.id),
    demand: state.demand.single.payload,
    etags: {
      demand: state.demand.single.etag,
    },
    selects: {
      sex: getSex(getScopeOptions(state, DEMAND)),
      ethnicGroups: getEthnicGroups(getScopeOptions(state, DEMAND)),
      bodyBuilds: getBodyBuilds(getScopeOptions(state, DEMAND)),
      breastSizes: getBreastSizes(getScopeOptions(state, DEMAND)),
      hairStyles: getHairStyles(getScopeOptions(state, DEMAND)),
      hairColors: getHairColors(getScopeOptions(state, DEMAND)),
      faceShapes: getFaceShapes(getScopeOptions(state, DEMAND)),
      beardColors: getBeardColors(getScopeOptions(state, DEMAND)),
      eyebrowColors: getEyebrowColors(getScopeOptions(state, DEMAND)),
      eyeColors: getEyeColors(getScopeOptions(state, DEMAND)),
      nailsColors: getNailsColors(getScopeOptions(state, DEMAND)),
      handHairColors: getHandHairColors(getScopeOptions(state, DEMAND)),
      timelineSides: getTimelineSides(getScopeOptions(state, DEMAND)),
    },
    fetching: demandFetching(id, state) || isFetching(state, DEMAND) || spotsFetching(state),
  };
};
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  schema: () => dispatch(schema()),
  single: (id: string, next: () => (void)) => dispatch(single(id, [], next)),
  spotHistory: (id: string, next: () => (void)) => dispatch(spotHistory(id, [], next)),
  reconsider: (
    id: string,
    demand: Object,
    etag: string,
    next: (string) => (void),
  ) => dispatch(reconsider(id, demand, etag, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Extend);
