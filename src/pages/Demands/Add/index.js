// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten, unflatten } from 'flat';
import merge from 'lodash/merge';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { getScopeOptions, getScopeSchema, isFetching } from '../../../schema/reducers';
import { DEMAND } from '../../../demand/actions';
import { options, schema } from '../../../demand/endpoints';
import {
  getBodyBuilds,
  getBreastSizes,
  getHairStyles,
  getEthnicGroups,
  getSex,
  getHairColors,
  getRatings,
  getFaceShapes,
} from '../../../description/selects';

type Props = {|
  +selects: Object,
  +options: () => (void),
  +schema: () => (void),
  +fetching: boolean,
|};
type State = {|
  demand: Object,
|};
class Add extends React.Component<Props, State> {
  state = {
    demand: {
      general: {
        firstname: null,
        sex: null,
        ethnic_group_id: null,
        age: null,
      },
      body: {
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
        style: null,
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
          unflatten({ [name]: event.target.checked || event.target.value }),
        ),
      },
    })
  );

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }
    return (
      <NestedStepper
        onChange={this.handleChange}
        values={flatten(this.state.demand)}
        selects={this.props.selects}
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
    ratings: getRatings(getScopeSchema(state, DEMAND)),
    faceShapes: getFaceShapes(getScopeOptions(state, DEMAND)),
  },
  fetching: isFetching(state, DEMAND),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  schema: () => dispatch(schema()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Add);
