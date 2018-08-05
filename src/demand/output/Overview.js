// @flow
import React from 'react';
import moment from 'moment';
import { default as DescriptionOverview } from '../../description/output/Overview';
import SolidCard from '../../description/output/SolidCard';
import TextRow from '../../description/output/TextRow';

type Props = {|
  +demand: Object,
|};
const Overview = ({ demand }: Props) => (
  <DescriptionOverview
    description={demand}
    cards={
      <SolidCard
        title="Spot"
        rows={[
          <TextRow
            key="Coordinates"
            title="Coordinates"
            text={`${demand.spots[0].coordinates.latitude}, ${demand.spots[0].coordinates.longitude}`}
          />,
          <TextRow
            key="Met at"
            title="Met at"
            text={moment(demand.spots[0].met_at.moment).format('YYYY-MM-DD HH:mm')}
          />,
        ]}
      />
    }
  />
);

export default Overview;
