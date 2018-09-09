// @flow
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import MapIcon from '@material-ui/icons/Map';
import * as Card from '../../components/Card';
import * as Row from '../../components/Card/Row';

const SpaceBetween = styled.span`
  padding-right: 10px;
`;

type Props = {|
  +spots: Array<Object>,
  +places: Array<Object>,
|};
const Overview = ({ spots, places }: Props) => (
  <Card.Container>
    {spots.map((spot, position) => (
      <SpaceBetween key={spot.id}>
        <Card.Solid
          title={(
            <React.Fragment>
              <a href={`https://www.google.com/maps/@${spot.coordinates.latitude},${spot.coordinates.longitude},15z`}>
                <MapIcon />
              </a>
              <br />
              {places[spot.id].failed ? `Spot #${position + 1}` : places[spot.id].payload.address}
            </React.Fragment>
)}
          rows={[
            <Row.Text
              key={`met_at-${spot.id}`}
              title="Time"
              text={moment(spot.met_at.moment).format('YYYY-MM-DD HH:mm')}
            />,
            spot.met_at.approximation && (
            <Row.Text
              key={`approximation-${spot.id}`}
              title="Approximation"
              text={`${moment.duration(spot.met_at.approximation).humanize()} ${spot.met_at.timeline_side}`}
            />
            ),
          ]}
        />
      </SpaceBetween>
    ))}
  </Card.Container>
);

export default Overview;
