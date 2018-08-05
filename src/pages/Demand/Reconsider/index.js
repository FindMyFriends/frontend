// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten, unflatten } from 'flat';
import merge from 'lodash/merge';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { isFetching } from '../../../schema/reducers';
import { DEMAND } from '../../../demand/actions';
import { reconsider, single, options, schema, getScopeOptions } from '../../../demand/endpoints';
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

type Props = {|
  +reconsider: (Object, (string) => (void)) => (void),
  +single: (string, (Object) => (void)) => (void),
  +schema: () => (void),
  +options: () => (void),
  +fetching: boolean,
  +history: Object,
  +match: Object,
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
    this.props.single(id, demand => this.setState({ demand }));
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
      normalize(this.state.demand),
      id => this.props.history.push(`/demands/${id}`),
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
  fetching: state.demand.fetching || isFetching(state, DEMAND),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  schema: () => dispatch(schema()),
  single: (id: string, next: () => (void)) => dispatch(single(id, [], next)),
  reconsider: (demand: Object, next: (string) => (void)) => dispatch(reconsider(demand, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Extend);
