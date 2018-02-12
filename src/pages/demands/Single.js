import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'material-ui/Card';
import * as R from 'ramda';
import { getPrettyDemand } from './../../demand/reducers';
import { single, options } from './../../demand/endpoints';

class Single extends React.Component {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(options());
    dispatch(single(id));
  }

  render() {
    const { demand } = this.props;
    if (R.isEmpty(demand)) {
      return <h1>Loading...</h1>;
    }
    return (
      <React.Fragment>
        <Card>
          <CardHeader title="General" />
          <ul>
            <li><small>Age</small> {demand.general.age.from} - {demand.general.age.to}</li>
            <li><small>Ethnic group</small>{demand.general.ethnic_group}</li>
            <li><small>Gender</small>{demand.general.gender}</li>
            <li><small>Firstname</small>{demand.general.firstname}</li>
            {
              demand.general.lastname
                ? <li><small>Lastname</small>{demand.general.lastname}</li>
                : null
            }
          </ul>
        </Card>
        <Card>
          <CardHeader title="Body" />
          <ul>
            {demand.body.build ? <li><small>Build</small> {demand.body.build}</li> : null}
            {demand.body.weight ? <li><small>Weight</small>{demand.body.weight}</li> : null}
            {demand.body.height ? <li><small>Height</small>{demand.body.height}</li> : null}
            {
              demand.body.breast_size
                ? <li><small>Breast size</small>{demand.body.breast_size}</li>
                : null
            }
          </ul>
        </Card>
        <Card>
          <CardHeader title="Hair" />
          <ul>
            {demand.hair.style ? <li><small>Style</small> {demand.hair.style}</li> : null}
            {demand.hair.color ? <li><small>Color</small> {demand.hair.color}</li> : null}
            {demand.hair.length ? <li><small>Length</small> {demand.hair.length}</li> : null}
            {demand.hair.nature !== null ? (<li><small>Nature</small> {demand.hair.nature ? 'Yes' : 'No'}</li>) : null}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Face" />
          <ul>
            {demand.face.care ? <li><small>Care</small> {demand.face.care}</li> : null}
            {demand.face.freckles !== null ? (<li><small>Care</small> {demand.face.freckles ? 'Yes' : 'No'}</li>) : null}
            {demand.face.shape ? <li><small>Shape</small> {demand.face.shape}</li> : null}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Eyebrow" />
          <ul>
            {demand.eyebrow.care ? <li><small>Care</small> {demand.eyebrow.care}</li> : null}
            {demand.eyebrow.color ? <li><small>Color</small> {demand.eyebrow.color}</li> : null}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Eyes" />
          {/* TODO: Compare left and right */}
          <ul>
            {demand.eye.left.color ? <li><small>Color</small> {demand.eye.left.color}</li> : null}
            {demand.eye.left.lenses !== null ? (<li><small>Lenses</small> {demand.eye.left.lenses ? 'Yes' : 'No'}</li>) : null}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Teeth" />
          <ul>
            {demand.teeth.care ? <li><small>Care</small> {demand.teeth.care}</li> : null}
            {demand.teeth.braces !== null ? (<li><small>Braces</small> {demand.teeth.braces ? 'Yes' : 'No'}</li>) : null}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Hands" />
          <ul>
            {demand.hands.care ? <li><small>Care</small> {demand.hands.care}</li> : null}
            {
              demand.hands.vein_visibility
                ? <li><small>Vein visibility</small> {demand.hands.vein_visibility}</li>
                : null
            }
            {
              demand.hands.joint_visibility
                ? <li><small>Joint visibility</small> {demand.hands.joint_visibility}</li>
                : null
            }
          </ul>
        </Card>
        <Card>
          <CardHeader title="Nails" />
          <ul>
            {
              demand.hands.nails.care
                ? <li><small>Care</small> {demand.hands.nails.care}</li>
                : null
            }
            {
              demand.hands.nails.color
                ? <li><small>Color</small> {demand.hands.nails.color}</li>
                : null
            }
            {
              demand.hands.nails.length
                ? <li><small>Length</small> {demand.hands.nails.length}</li>
                : null
              }
          </ul>
        </Card>
        <Card>
          <CardHeader title="Hand hair" />
          <ul>
            {
              demand.hands.hair.amount
                ? <li><small>Amount</small> {demand.hands.hair.amount}</li>
                : null
            }
            {
              demand.hands.hair.color
                ? <li><small>Color</small> {demand.hands.hair.color}</li>
                : null
            }
          </ul>
        </Card>
        <Card>
          <CardHeader title="Location" />
          <ul>
            {
              <li>
                <small>Coordinates</small>
                {demand.location.coordinates.latitude}, {demand.location.coordinates.longitude}
              </li>
            }
            {<li><small>Met at</small> {demand.location.met_at.moment}</li>} {/* TODO: Add side */}
          </ul>
        </Card>
      </React.Fragment>
    );
  }
}

Single.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  demand: PropTypes.object.isRequired,
};

export default connect(state => ({
  demand: getPrettyDemand(state.demand.single || { }, state.demand.options || { }),
}))(Single);
