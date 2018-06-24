// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten, unflatten } from 'flat';
import merge from 'lodash/merge';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { getScopeOptions, isFetching } from '../../../schema/reducers';
import { EVOLUTION } from '../../../evolution/actions';
import { extend, single, options, schema } from '../../../evolution/endpoints';
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

type Props = {|
  +extend: (Object, (string) => (void)) => (void),
  +single: (string, (Object) => (void)) => (void),
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
    evolution: { },
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.options();
    this.props.schema();
    this.props.single(id, evolution => this.setState({ evolution }));
  }

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
      id => this.props.history.push(`/evolutions/${id}`),
    )
  );

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
            values: flatten(this.state.evolution),
          })
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  selects: {
    sex: getSex(getScopeOptions(state, EVOLUTION)),
    ethnicGroups: getEthnicGroups(getScopeOptions(state, EVOLUTION)),
    bodyBuilds: getBodyBuilds(getScopeOptions(state, EVOLUTION)),
    breastSizes: getBreastSizes(getScopeOptions(state, EVOLUTION)),
    hairStyles: getHairStyles(getScopeOptions(state, EVOLUTION)),
    hairColors: getHairColors(getScopeOptions(state, EVOLUTION)),
    faceShapes: getFaceShapes(getScopeOptions(state, EVOLUTION)),
    beardColors: getBeardColors(getScopeOptions(state, EVOLUTION)),
    eyebrowColors: getEyebrowColors(getScopeOptions(state, EVOLUTION)),
    eyeColors: getEyeColors(getScopeOptions(state, EVOLUTION)),
    nailsColors: getNailsColors(getScopeOptions(state, EVOLUTION)),
    handHairColors: getHandHairColors(getScopeOptions(state, EVOLUTION)),
  },
  fetching: state.evolution.fetching || isFetching(state, EVOLUTION),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  schema: () => dispatch(schema()),
  single: (id: string, next: () => (void)) => dispatch(single(id, [], next)),
  extend: (evolution: Object, next: (string) => (void)) => dispatch(extend(evolution, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Extend);
