// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten, unflatten } from 'flat';
import merge from 'lodash/merge';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import MoveButton from '../../../components/NestedStepper/MoveButton';
import { getScopeOptions, getScopeSchema, isFetching } from '../../../schema/reducers';
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
  getRatings,
  getFaceShapes,
  getBeardColors,
  getEyebrowColors,
  getEyeColors,
  getNailsColors,
  getHandHairColors,
} from '../../../description/selects';

type Props = {|
  +selects: Object,
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
      location: { // TODO: not complete
        coordinates: {
          latitude: 50.1,
          longitude: 50.2,
        },
        met_at: {
          moment: '2017-01-01T13:58:10+00:00',
          timeline_side: 'sooner',
          approximation: 'PT3H',
        },
      },
      general: {
        firstname: null,
        lastname: null,
        sex: 'man',
        ethnic_group_id: 1,
        age: {
          from: 15,
          to: 20,
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

  handleClick = () => {
    this.props.add(
      normalize(this.state.demand),
      (id: string) => this.props.history.push(`/demads/${id}`),
    );
  };

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <NestedStepper
          onChange={this.handleChange}
          values={flatten(this.state.demand)}
          selects={this.props.selects}
        />
        <MoveButton onClick={this.handleClick}>
          Add
        </MoveButton>
      </React.Fragment>
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
    ratings: getRatings(getScopeSchema(state, DEMAND)),
    faceShapes: getFaceShapes(getScopeOptions(state, DEMAND)),
    beardColors: getBeardColors(getScopeOptions(state, DEMAND)),
    eyebrowColors: getEyebrowColors(getScopeOptions(state, DEMAND)),
    eyeColors: getEyeColors(getScopeOptions(state, DEMAND)),
    nailsColors: getNailsColors(getScopeOptions(state, DEMAND)),
    handHairColors: getHandHairColors(getScopeOptions(state, DEMAND)),
  },
  fetching: isFetching(state, DEMAND),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  schema: () => dispatch(schema()),
  add: (demand: Object, next: (string) => (void)) => dispatch(add(demand, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Add);
