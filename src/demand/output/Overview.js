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
        title="Location"
        rows={[
          <TextRow
            key="Coordinates"
            title="Coordinates"
            text={`${demand.location.coordinates.latitude}, ${demand.location.coordinates.longitude}`}
          />,
          <TextRow
            key="Met at"
            title="Met at"
            text={moment(demand.location.met_at.moment).format('YYYY-MM-DD HH:mm')}
          />,
        ]}
      />
    }
  />
);

export default Overview;
