// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten } from 'flat';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import * as events from '../../../components/form/events';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { getScopeOptions, isFetching } from '../../../schema/selects';
import { DEMAND } from '../../../demand/actions';
import { options, schema, add } from '../../../demand/endpoints';
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
} from '../../../description/selects';
import { getTimelineSides } from '../../../demand/selects';
import steps from '../../../demand/input/parts/steps';
import * as validation from '../../../description/validation';

type Props = {|
  +options: () => (void),
  +schema: () => (void),
  +add: (Object, (string) => (void)) => (void),
  +fetching: boolean,
  +history: Object,
|};
type State = {|
  demand: Object,
|};
class Add extends React.Component<Props, State> {
  state = {
    demand: {
      note: null,
      spots: [{
        coordinates: { // TODO: not complete
          latitude: 50.1,
          longitude: 50.2,
        },
        met_at: {
          moment: moment().toISOString(true),
          timeline_side: 'exactly',
          approximation: null,
        },
      }],
      general: {
        firstname: null,
        lastname: null,
        sex: null,
        ethnic_group_id: null,
        age: {
          from: null,
          to: null,
        },
      },
      body: {
        breast_size: null,
        build_id: null,
      },
      hair: {
        color_id: null,
        style_id: null,
        length_id: null,
        nature: null,
        highlights: null,
        roots: null,
      },
      face: {
        freckles: null,
        care: null,
        shape_id: null,
      },
      beard: {
        color_id: null,
        style_id: null,
        length_id: null,
      },
      eyebrow: {
        color_id: null,
        care: null,
      },
      eye: {
        left: {
          color_id: null,
          lenses: null,
        },
        right: {
          color_id: null,
          lenses: null,
        },
      },
      teeth: {
        care: null,
        braces: null,
      },
      hands: {
        care: null,
        visible_veins: null,
        nails: {
          length_id: null,
          color_id: null,
        },
      },
    },
  };

  componentDidMount = () => {
    this.props.options();
    this.props.schema();
  };

  handleChange = name => event => (
    this.setState({
      demand: {
        ...events.flattenChange(event, name, this.state.demand),
      },
    })
  );

  handleAppendedSpot = () => (
    this.setState({
      ...this.state,
      demand: {
        ...this.state.demand,
        spots: [
          ...this.state.demand.spots,
          cloneDeep([...this.state.demand.spots].pop()),
        ],
      },
    })
  );

  handleDetachedSpot = (position: number) => {
    this.setState({
      ...this.state,
      demand: {
        ...this.state.demand,
        spots: this.state.demand.spots.filter((spot, index) => index !== position),
      },
    });
  };

  handleAdd = () => {
    this.props.add(
      this.state.demand,
      (id: string) => this.props.history.push(`/demands/${id}`),
    );
  };

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }
    return (
      <NestedStepper
        valid={validation.isValid(this.state.demand)}
        onAdd={this.handleAdd}
        steps={
          steps({
            ...this.props,
            onSpotAppend: this.handleAppendedSpot,
            onSpotDetach: (position: number) => this.handleDetachedSpot(position),
            onChange: this.handleChange,
            values: flatten(this.state.demand),
          })
        }
      />
    );
  }
}

const mapStateToProps = state => ({
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
    hairLengths: getHairLengths(getScopeOptions(state, DEMAND)),
    beardStyles: getBeardStyles(getScopeOptions(state, DEMAND)),
    beardLengths: getBeardLengths(getScopeOptions(state, DEMAND)),
    timelineSides: getTimelineSides(getScopeOptions(state, DEMAND)),
  },
  fetching: isFetching(state, DEMAND),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  schema: () => dispatch(schema()),
  add: (demand: Object, next: (string) => (void)) => dispatch(add(demand, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Add);
