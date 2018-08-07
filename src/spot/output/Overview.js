// @flow
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
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
|};
const Overview = ({ spots }: Props) => (
  <Cards>
    {spots.map((spot, position) => (
      <SpaceBetween>
        <SolidCard
          title={`Spot #${position + 1}`}
          rows={[
            <TextRow
              key="Met at"
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
