// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten, unflatten } from 'flat';
import moment from 'moment';
import { merge, cloneDeep } from 'lodash';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { isFetching } from '../../../schema/selects';
import { EVOLUTION, invalidatedAll } from '../../../evolution/actions';
import { extend, single, options, schema } from '../../../evolution/endpoints';
import { getScopeOptions } from '../../../evolution/selects';
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
      evolution => this.setState({ evolution: { ...evolution, ...this.state.evolution } }),
    );
  };

  // TODO: Move - common with demand
  handleChange = name => event => (
    this.setState({
      evolution: {
        ...merge(
          this.state.evolution,
          unflatten({
            [name]: event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value,
          }),
        ),
      },
    })
  );

  handleExtend = () => (
    this.props.extend(
      normalize(this.state.evolution),
      (id: string) => Promise.resolve()
        .then(this.props.invalidateAllEvolutions)
        .then(this.props.history.push(`/evolutions/${id}`)),
    )
  );

  // TODO: Common with demand
  handleAppendedSpot = () => (
    this.setState({
      ...this.state,
      evolution: {
        ...this.state.evolution,
        spots: [
          ...this.state.evolution.spots,
          cloneDeep([...this.state.evolution.spots].pop()),
        ],
      },
    })
  );

  handleDetachedSpot = (position: number) => {
    this.setState({
      ...this.state,
      evolution: {
        ...this.state.evolution,
        spots: this.state.evolution.spots.filter((spot, index) => index !== position),
      },
    });
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
    handHairColors: getHandHairColors(getScopeOptions(state)),
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
