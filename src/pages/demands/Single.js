import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import * as R from 'ramda';
import styled from 'styled-components';
import { getPrettyDemand } from './../../demand/reducers';
import { single, options, retract } from './../../demand/endpoints';
import { all as allSoulmates, requests as soulmateRequests, refresh } from './../../soulmate/endpoints';
import { requestedConfirm } from './../../ui/actions';
import { Box as SoulmateBox } from './../../soulmate/output/Box';

const Eye = ({ eye }) => (
  <ul>
    {eye.color ? <li><small>Color</small> {eye.color}</li> : null}
    {eye.lenses !== null ? (<li><small>Lenses</small> {eye.lenses ? 'Yes' : 'No'}</li>) : null}
  </ul>
);

const Ul = styled.ul`
  padding: 16px;
  list-style: none;
`;

const Cards = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
`;

const ResizedCard = styled(Card)`
  width: 300px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

class Single extends React.Component {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(options());
    dispatch(single(id));
    dispatch(allSoulmates(id, { page: 1, perPage: 10 }));
    dispatch(soulmateRequests(id));
  }

  handleRefresh = this.handleRefresh.bind(this);

  handleRefresh() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(refresh(id));
  }

  render() {
    const {
      demand, dispatch, history, soulmates, requests,
    } = this.props;
    if (R.isEmpty(demand)) {
      return <h1>Loading...</h1>;
    }
    return (
      <React.Fragment>
        <SoulmateBox
          soulmates={soulmates}
          requests={requests}
          onRefresh={() => this.handleRefresh()}
        />
        <RaisedButton
          label="Retract"
          secondary
          onClick={() => dispatch(requestedConfirm('Are you sure, you want to retract demand?', () => dispatch(retract(demand.id, history))))}
        />
        <Cards>
          <ResizedCard>
            <CardHeader title="General" />
            <Ul>
              <li><small>Age</small> {demand.general.age.from} - {demand.general.age.to}</li>
              <li><small>Ethnic group</small>{demand.general.ethnic_group}</li>
              <li><small>Gender</small>{demand.general.gender}</li>
              <li><small>Firstname</small>{demand.general.firstname}</li>
              {
                demand.general.lastname
                  ? <li><small>Lastname</small>{demand.general.lastname}</li>
                  : null
              }
            </Ul>
          </ResizedCard>
          <ResizedCard>
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
          </ResizedCard>
          <ResizedCard>
            <CardHeader title="Hair" />
            <ul>
              {demand.hair.style ? <li><small>Style</small> {demand.hair.style}</li> : null}
              {demand.hair.color ? <li><small>Color</small> {demand.hair.color}</li> : null}
              {demand.hair.length ? <li><small>Length</small> {demand.hair.length}</li> : null}
              {demand.hair.nature !== null ? (<li><small>Nature</small> {demand.hair.nature ? 'Yes' : 'No'}</li>) : null}
            </ul>
          </ResizedCard>
          <ResizedCard>
            <CardHeader title="Face" />
            <ul>
              {demand.face.care ? <li><small>Care</small> {demand.face.care}</li> : null}
              {demand.face.freckles !== null ? (<li><small>Care</small> {demand.face.freckles ? 'Yes' : 'No'}</li>) : null}
              {demand.face.shape ? <li><small>Shape</small> {demand.face.shape}</li> : null}
            </ul>
          </ResizedCard>
          <ResizedCard>
            <CardHeader title="Eyebrow" />
            <ul>
              {demand.eyebrow.care ? <li><small>Care</small> {demand.eyebrow.care}</li> : null}
              {demand.eyebrow.color ? <li><small>Color</small> {demand.eyebrow.color}</li> : null}
            </ul>
          </ResizedCard>
          <ResizedCard>
            <CardHeader title="Eyes" />
            {
              JSON.stringify(demand.eye.left) === JSON.stringify(demand.eye.right)
                ? <Eye eye={demand.eye.left} />
                : (
                  <React.Fragment>
                    <h3>Left</h3>
                    <Eye eye={demand.eye.left} />
                    <h3>Right</h3>
                    <Eye eye={demand.eye.right} />
                  </React.Fragment>
                )
            }
          </ResizedCard>
          <ResizedCard>
            <CardHeader title="Teeth" />
            <ul>
              {demand.teeth.care ? <li><small>Care</small> {demand.teeth.care}</li> : null}
              {demand.teeth.braces !== null ? (<li><small>Braces</small> {demand.teeth.braces ? 'Yes' : 'No'}</li>) : null}
            </ul>
          </ResizedCard>
          <ResizedCard>
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
          </ResizedCard>
          <ResizedCard>
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
          </ResizedCard>
          <ResizedCard>
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
          </ResizedCard>
          <ResizedCard>
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
          </ResizedCard>
        </Cards>
      </React.Fragment>
    );
  }
}

Single.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  demand: PropTypes.object.isRequired,
  soulmates: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired,
};

Eye.propTypes = {
  eye: PropTypes.object.isRequired,
};

export default connect(state => ({
  demand: getPrettyDemand(state.demand.single || { }, state.demand.options || { }),
  soulmates: state.soulmate.all || [],
  requests: state.soulmate.requests || [],
}))(Single);
