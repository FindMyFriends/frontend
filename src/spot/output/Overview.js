// @flow
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import MapIcon from '@material-ui/icons/Map';
import SolidCard from '../../description/output/SolidCard';
import TextRow from '../../description/output/TextRow';

const Cards = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`;

const SpaceBetween = styled.span`
  padding-right: 10px;
`;

type Props = {|
  +spots: Array<Object>,
  +places: Array<Object>,
|};
const Overview = ({ spots, places }: Props) => (
  <Cards>
    {spots.map((spot, position) => (
      <SpaceBetween key={spot.id}>
        <SolidCard
          title={
            <React.Fragment>
              <a href={`https://www.google.com/maps/@${spot.coordinates.latitude},${spot.coordinates.longitude},15z`}>
                <MapIcon />
              </a>
              <br />
              {places[spot.id].failed ? `Spot #${position + 1}` : places[spot.id].address}
            </React.Fragment>
          }
          rows={[
            <TextRow
              key={`met_at-${spot.id}`}
              title="Met at"
              text={moment(spot.met_at.moment).format('YYYY-MM-DD HH:mm')}
            />,
          ]}
        />
      </SpaceBetween>
    ))}
  </Cards>
);

export default Overview;
