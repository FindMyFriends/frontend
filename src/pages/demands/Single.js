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

const Row = styled.tr`
  text-align: left;
`;

const SolidCard = ({ title, rows }) => {
  return (
    <ResizedCard>
      <CardHeader title={title} titleStyle={{'font-size': '20px'}} />
      <CardText>
        <table>
          {rows.filter(row => row.text).map(row => (
            <Row>
              <th>{row.title}</th>
              <td>{row.text}</td>
            </Row>
          ))}
        </table>
      </CardText>
    </ResizedCard>
  );
};

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
          <SolidCard
            title="General"
            rows={[
              { title: 'Age', text: `${demand.general.age.from} - ${demand.general.age.to}` },
              { title: 'Ethnic group', text: demand.general.ethnic_group },
              { title: 'Gender', text: demand.general.gender },
              { title: 'Firstname', text: demand.general.firstname },
            ]}
          />
          <SolidCard
            title="Body"
            rows={[
              { title: 'Build', text: demand.body.build },
              { title: 'Weight', text: demand.body.weight },
              { title: 'Height', text: demand.body.height },
              { title: 'Breast size', text: demand.body.breast_size },
            ]}
          />
          <SolidCard
            title="Hair"
            rows={[
              { title: 'Style', text: demand.hair.style },
              { title: 'Color', text: demand.hair.color },
              { title: 'Length', text: demand.hair.length },
              { title: 'Nature', text: demand.hair.nature ? 'Yes' : 'No' },
            ]}
          />
          <SolidCard
            title="Face"
            rows={[
              { title: 'Care', text: demand.face.care },
              { title: 'Freckles', text: demand.face.freckles ? 'Yes' : 'No' },
              { title: 'Shape', text: demand.face.shape },
            ]}
          />
          <SolidCard
            title="Eyebrow"
            rows={[
              { title: 'Care', text: demand.eyebrow.care },
              { title: 'Color', text: demand.eyebrow.color },
            ]}
          />
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
          <SolidCard
            title="Teeth"
            rows={[
              { title: 'Care', text: demand.teeth.care },
              { title: 'Braces', text: demand.teeth.braces ? 'Yes' : 'No' },
            ]}
          />
          <SolidCard
            title="Hands"
            rows={[
              { title: 'Care', text: demand.hands.care },
              { title: 'Vein visibility', text: demand.hands.vein_visibility },
              { title: 'Joint visibility', text: demand.hands.joint_visibility },
            ]}
          />
          <SolidCard
            title="Nails"
            rows={[
              { title: 'Care', text: demand.hands.nails.care },
              { title: 'Color', text: demand.hands.nails.color },
              { title: 'Length', text: demand.hands.nails.length },
            ]}
          />
          <SolidCard
            title="Hand hair"
            rows={[
              { title: 'Amount', text: demand.hands.hair.amount },
              { title: 'Color', text: demand.hands.hair.color },
            ]}
          />
          <SolidCard
            title="Location"
            rows={[
              { title: 'Coordinates', text: `${demand.location.coordinates.latitude}, ${demand.location.coordinates.longitude}` },
              { title: 'Coordinates', text: demand.location.met_at.moment },
            ]}
          />
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
