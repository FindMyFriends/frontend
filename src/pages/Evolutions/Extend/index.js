// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten } from 'flat';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import * as events from '../../../components/form/events';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { isFetching } from '../../../schema/selects';
import { EVOLUTION, invalidatedAll } from '../../../evolution/actions';
import {
  extend,
  single,
  options,
  schema,
} from '../../../evolution/endpoints';
import { getScopeOptions, getScopeSchema } from '../../../evolution/selects';
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
  getHairLengths,
  getBeardStyles,
  getBeardLengths,
  getAge,
} from '../../../description/selects';
import steps from '../../../evolution/input/parts/steps';
import { getTimelineSides } from '../../../demand/selects';

type Props = {|
  +extend: (Object, (string) => (Promise<any>)) => (any),
  +single: (string, (Object) => (void)) => (void),
  +invalidateAllEvolutions: () => (void),
  +schema: () => (void),
  +options: () => (void),
  +fetching: boolean,
  +history: Object,
  +match: Object,
|};
type State = {|
  evolution: Object,
|};
class Extend extends React.Component<Props, State> {
  state = {
    evolution: {
      spots: [{
        coordinates: { // TODO: make a map
          latitude: 50.5,
          longitude: 50.5,
        },
        met_at: {
          moment: moment().toISOString(true),
          timeline_side: 'sooner',
          approximation: 'PT1H',
        },
      }],
    },
  };

  componentDidMount = () => {
    const { match: { params: { id } } } = this.props;
    this.props.options();
    this.props.schema();
    this.props.single(
      id,
      evolution => this.setState(prevState => ({
        evolution: { ...evolution, ...prevState.evolution },
      })),
    );
  };

  handleChange = name => (event) => {
    event.persist();
    this.setState(prevState => ({
      evolution: {
        ...events.flattenChange(event, name, prevState.evolution),
      },
    }));
  };

  handleExtend = () => (
    this.props.extend(
      this.state.evolution,
      (id: string) => Promise.resolve()
        .then(this.props.invalidateAllEvolutions)
        .then(this.props.history.push(`/evolutions/${id}`)),
    )
  );

  // TODO: Common with demand
  handleAppendedSpot = () => (
    this.setState(prevState => ({
      ...prevState,
      evolution: {
        ...prevState.evolution,
        spots: [
          ...prevState.evolution.spots,
          cloneDeep([...prevState.evolution.spots].pop()),
        ],
      },
    }))
  );

  handleDetachedSpot = (position: number) => {
    this.setState(prevState => ({
      ...prevState,
      evolution: {
        ...prevState.evolution,
        spots: prevState.evolution.spots.filter((spot, index) => index !== position),
      },
    }));
  };

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }
    return (
      <NestedStepper
        onAdd={this.handleExtend}
        steps={
          steps({
            ...this.props,
            onChange: this.handleChange,
            onSpotAppend: this.handleAppendedSpot,
            onSpotDetach: (position: number) => this.handleDetachedSpot(position),
            values: flatten(this.state.evolution),
          })
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  selects: {
    age: getAge(getScopeSchema(state)),
    sex: getSex(getScopeOptions(state)),
    ethnicGroups: getEthnicGroups(getScopeOptions(state)),
    bodyBuilds: getBodyBuilds(getScopeOptions(state)),
    breastSizes: getBreastSizes(getScopeOptions(state)),
    hairStyles: getHairStyles(getScopeOptions(state)),
    hairColors: getHairColors(getScopeOptions(state)),
    faceShapes: getFaceShapes(getScopeOptions(state)),
    beardColors: getBeardColors(getScopeOptions(state)),
    eyebrowColors: getEyebrowColors(getScopeOptions(state)),
    eyeColors: getEyeColors(getScopeOptions(state)),
    nailsColors: getNailsColors(getScopeOptions(state)),
    hairLengths: getHairLengths(getScopeOptions(state)),
    beardStyles: getBeardStyles(getScopeOptions(state)),
    beardLengths: getBeardLengths(getScopeOptions(state)),
    timelineSides: getTimelineSides(getScopeOptions(state)),
  },
  fetching: state.evolution.fetching || isFetching(state, EVOLUTION),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  schema: () => dispatch(schema()),
  single: (id: string, next: () => (void)) => dispatch(single(id, [], next)),
  extend: (evolution: Object, next: (string) => (void)) => dispatch(extend(evolution, next)),
  invalidateAllEvolutions: () => dispatch(invalidatedAll()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Extend);
