// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten, unflatten } from 'flat';
import merge from 'lodash/merge';
import moment from 'moment';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { getScopeOptions, isFetching } from '../../../schema/reducers';
import { DEMAND } from '../../../demand/actions';
import { options, schema, add } from '../../../demand/endpoints';
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
        height: {
          value: null,
          unit: 'cm',
        },
        weight: {
          value: null,
          unit: 'kg',
        },
      },
      hair: {
        color_id: null,
        style_id: null,
        length: {
          value: null,
          unit: 'cm',
        },
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
        style: null,
        length: {
          value: null,
          unit: 'cm',
        },
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
        vein_visibility: null,
        joint_visibility: null,
        nails: {
          care: null,
          length: {
            value: null,
            unit: 'cm',
          },
          color_id: null,
        },
        hair: {
          color_id: null,
          amount: null,
        },
      },
    },
  };

  componentDidMount() {
    this.props.options();
    this.props.schema();
  }

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

  handleAdd = () => {
    this.props.add(
      normalize(this.state.demand),
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
    handHairColors: getHandHairColors(getScopeOptions(state, DEMAND)),
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
