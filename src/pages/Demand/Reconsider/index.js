// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten } from 'flat';
import { cloneDeep, omit } from 'lodash';
import * as events from '../../../components/form/events';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { isFetching, getScopeOptions, getScopeSchema } from '../../../schema/selects';
import { DEMAND } from '../../../demand/actions';
import { reconsider, single, options, schema } from '../../../demand/endpoints';
import { history as spotHistory } from '../../../demand/spot/endpoints';
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
  getBeardLengths,
  getBeardStyles,
  getHairLengths,
  getAge,
} from '../../../description/selects';
import steps from '../../../demand/input/parts/steps';
import { spotsFetching, getSpotsByDemand } from '../../../spot/selects';
import {
  getById as getDemandById,
  getETag as getDemandETag,
  singleFetching as demandFetching,
  getTimelineSides,
} from '../../../demand/selects';

type Props = {|
  +reconsider: (string, Object, string, (string) => (Promise<any>)) => (void),
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

  componentDidMount = () => {
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
  };

  handleChange = name => event => (
    this.setState({
      demand: {
        ...events.flattenChange(event, name, this.state.demand),
      },
    })
  );

  handleReconsider = () => (
    this.props.reconsider(
      this.state.demand.id,
      this.state.demand,
      this.props.etags.demand,
      () => this.props.history.push(`/demands/${this.state.demand.id}`),
    )
  );

  handleAppendedSpot = () => (
    this.setState({
      ...this.state,
      demand: {
        ...this.state.demand,
        spots: [
          ...this.state.demand.spots,
          omit(cloneDeep([...this.state.demand.spots].pop()), ['id']),
        ],
      },
    })
  );

  handleDetachedSpot = (position: number) => (
    this.setState({
      ...this.state,
      demand: {
        ...this.state.demand,
        spots: this.state.demand.spots.filter((spot, index) => index !== position),
      },
    })
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
            onSpotAppend: this.handleAppendedSpot,
            onSpotDetach: (position: number) => this.handleDetachedSpot(position),
            values: flatten(this.state.demand),
          })
        }
      />
    );
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => {
  return {
    spots: getSpotsByDemand(state, id),
    demand: getDemandById(id, state),
    etags: {
      demand: getDemandETag(id, state),
    },
    selects: {
      age: getAge(getScopeSchema(state, DEMAND)),
      sex: getSex(getScopeOptions(state, DEMAND)),
      ethnicGroups: getEthnicGroups(getScopeOptions(state, DEMAND)),
      bodyBuilds: getBodyBuilds(getScopeOptions(state, DEMAND)),
      breastSizes: getBreastSizes(getScopeOptions(state, DEMAND)),
      hairStyles: getHairStyles(getScopeOptions(state, DEMAND)),
      hairColors: getHairColors(getScopeOptions(state, DEMAND)),
      hairLengths: getHairLengths(getScopeOptions(state, DEMAND)),
      faceShapes: getFaceShapes(getScopeOptions(state, DEMAND)),
      beardColors: getBeardColors(getScopeOptions(state, DEMAND)),
      eyebrowColors: getEyebrowColors(getScopeOptions(state, DEMAND)),
      eyeColors: getEyeColors(getScopeOptions(state, DEMAND)),
      nailsColors: getNailsColors(getScopeOptions(state, DEMAND)),
      beardStyles: getBeardStyles(getScopeOptions(state, DEMAND)),
      beardLengths: getBeardLengths(getScopeOptions(state, DEMAND)),
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
